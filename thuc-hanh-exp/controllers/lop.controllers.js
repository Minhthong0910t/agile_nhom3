const { Types } = require('mongoose');
var myMD = require('../models/agile.models');
var msg = "";

exports.list = async (req, res, next) => {
    var msg = "";
    let timKiem = null;
    if (req.query.tenLop != '' && String(req.query.tenLop) != 'undefined') {
        timKiem = { tenLop: req.query.tenLop }
    }
    let list = await myMD.classModel.find(timKiem);
    res.render('lop/list', { listClass: list, req: req , msg: msg});
}

exports.listSV = async (req, res, next) => {
    var msg = "";
    let id = req.params.id;

    const objClass = await myMD.classModel.findById(id);
    let list = await myMD.studentListModel.find({id_lop : id}).populate('id_sv').populate('id_diem').populate('id_lop');
    res.render('lop/listSV', { list : list, req: req , msg: msg, objClass: objClass});
}


exports.add = async (req, res, next) => {
    msg = '';
    if (req.method == "POST") {
        try {
            let objClassCheck = await myMD.classModel.findOne({ tenLop: req.body.tenLop });
            if(objClassCheck){
                msg = "Lớp đã tồn tại.";
               return res.render('lop/add', { msg: msg, req: req});
            }
            const newClass = new myMD.classModel({
                tenLop: req.body.tenLop
            });
                await newClass.save();
                msg = "Đã thêm thành công";
                
            } catch (error) {
                msg = "Lỗi ghi CSDL" + error.message;
                console.log(error);
                return res.render('lop/add', { msg: msg , req: req});
            }
    }
    res.render('lop/add', { msg: msg , req: req});
}


exports.addSV = async (req, res, next) => {
    // lấy ds thể loại truyền ra view 
    let id = req.params.id;
    const objClass = await myMD.classModel.findById(id);
    let list = await myMD.studentListModel.find({id_lop : id}).populate('id_sv').populate('id_diem').populate('id_lop');
    if (objClass) {
        const classInfo = objClass;
        if (req.method == "POST") {
            try {
                // Lấy danh sách tất cả các MSSV đã tồn tại
                const existingStudents = await myMD.studentModel.find().select('_id');
                let MSSV;
                while (true) {
                    // Tạo MSSV ngẫu nhiên
                    const randomNumber = Math.floor(Math.random() * 100000);
                    MSSV = 'PH' + String(randomNumber).padStart(5, '0');
                    // Kiểm tra xem MSSV mới tạo có bị trùng lặp không
                    const existingMSSV = existingStudents.some(student => student._id === MSSV);
                    if (!existingMSSV) break; // Nếu không trùng lặp, thoát vòng lặp
                }
                // Gán giá trị MSSV vào _id
                const student = new myMD.studentModel(
                    { 
                        _id: MSSV,
                        tenSV : req.body.tenSV,
                        gioiTinh : req.body.gioiTinh,
                        ngaySinh : req.body.ngaySinh
                    });  
                await student.save();
                console.log(student);
                const studentList = new myMD.studentListModel({
                    id_lop: objClass._id,
                    id_sv: student._id,
                });
                    // // Thêm thông tin sinh viên vào danh sách sinh viên
                    await studentList.save();
                    await classInfo.save();
                    msg = "Đã thêm thành công";
                    res.redirect(req.originalUrl);  // Load lại trang hiện tại
            } catch (error) {
                msg = "Lỗi ghi CSDL" + error.message;
                console.log(error);
            }
        }
    } else {
        msg = "Lỗi ghi CSDL" 
    }
    res.render('lop/addSV', { msg: msg, req: req, objClass: objClass, list: list});
}

exports.edit = async (req, res, next) => {
    msg = ''
    let idsp = req.params.id;
    let objClass = await myMD.classModel.findById(idsp);
    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...   
        // tạo đối tượng model để gán dữ liệu
        let objClass = new myMD.classModel();
        objClass.tenLop = req.body.tenLop;
        objClass._id = idsp; 
        
        try {
            await myMD.classModel.findByIdAndUpdate(idsp, objClass);
            msg = "Đã cập nhập thành công";
        } catch (error) {
            msg = "Lỗi ghi CSDL" + error.message;
            console.log(error);
        }
    }
    res.render('lop/edit', { msg: msg, objClass: objClass , req: req});
}

exports.delete= async (req,res,next)=>{
    await myMD.classModel.deleteOne({_id: req.body.IdDelete});
    res.redirect('/lop');
}

exports.deleteSV= async (req,res,next)=>{
    let id = req.params.id;
    try {
            const studentList = await myMD.studentListModel.findById(req.body.IdDelete);
        if (!studentList) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy document' });
        }

        // Xóa document sinh viên trong collection "studentModel   
        await myMD.studentModel.deleteOne({_id: studentList.id_sv});

        // Xóa document liên quan trong collection "markModel"
        await myMD.markModel.deleteOne({_id: studentList.id_diem});
        
        // Xóa document sinh viên trong collection "studentListModel"
        await myMD.studentListModel.deleteOne({_id: req.body.IdDelete});

        msg = "Xóa Thành Công!"
    } catch (error) {
        msg = 'Lỗi' + error;
    }
    res.setHeader('Cache-Control', 'no-cache'); // Thêm header bắt buộc trình duyệt bỏ qua cache


    res.redirect(`/lop/listSV/${id}`);  // Load lại trang hiện tại

}



