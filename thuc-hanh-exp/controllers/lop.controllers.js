const { Types } = require('mongoose');
var myMD = require('../models/agile.models');
var msg = "";

exports.list = async (req, res, next) => {
    msg = "";
    let timKiem = null;
    if (req.query.tenLop != '' && String(req.query.tenLop) != 'undefined') {
        timKiem = { tenLop: req.query.tenLop }
    }
    let list = await myMD.classModel.find(timKiem);
    res.render('lop/list', { listClass: list, req: req , msg: msg});
}

exports.listSV = async (req, res, next) => {
    msg = "";
    let id = req.params.id;

    let timKiem = null;
    if (req.query.MSSV != '' && String(req.query.MSSV) != 'undefined') {
        timKiem = { id_sv : req.query.MSSV }
    }

    const objClass = await myMD.classModel.findById(id);
    let list = await myMD.studentListModel.find({id_lop : id, timKiem}).populate('id_sv').populate('id_diem').populate('id_lop');
    res.render('lop/listSV', { list : list, req: req , msg: msg, objClass: objClass});
}


exports.add = async (req, res, next) => {
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
    let list = await myMD.studentListModel.find().populate('id_sv').populate('id_diem').populate('id_lop');

    if (objClass) {

        if (req.method == "POST") {
            try {

                const sv = JSON.parse(req.body.sinhVien);
                const id_sv = sv._id;

                console.log(id_sv, "ID SINH VIEN");
                const exitstudentList = await myMD.studentListModel.findOne({id_sv: id_sv}).populate('id_sv').populate('id_diem').populate('id_lop');
                            
                if(Array.isArray(exitstudentList.id_lop)){
                    
                    const lopDaCo = exitstudentList.id_lop.find(lop => lop.toString() === id);
                    if (lopDaCo) { // Nếu sinh viên đã tồn tại trong lớp
                        msg = `Sinh viên ${sv.tenSV} đã có trong lớp này.`;
                      } else {
                        exitstudentList.id_lop.push(id); // Thêm id mới vào mảng id_lop
                        await exitstudentList.save();
                        msg = 'Thêm thành công';
                        return res.render('lop/addSV', { msg: msg, req: req, objClass: objClass, list: list});
                      }

                    return res.render('lop/addSV', { msg: msg, req: req, objClass: objClass, list: list});
                }else {
                    const studentList = await myMD.studentListModel.findOne({id_sv: id_sv, id_lop : id}).populate('id_sv').populate('id_diem').populate('id_lop');
                    if(studentList){
                        msg = `Sinh viên ${sv.tenSV} đã có trong lớp này.`;
                        return res.render('lop/addSV', { msg: msg, req: req, objClass: objClass, list: list});
                    }else{
                        
                        const studentList = new myMD.studentListModel({
                            id_lop : objClass._id
                        });
                        
                        await myMD.studentListModel.findByIdAndUpdate(studentList._id, studentList);
                        msg = 'Thêm Thành Công.'
                    }
                }
                 
                
                
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
        studentList.id_lop = null ;
        

        await myMD.studentListModel.findByIdAndUpdate(studentList._id, studentList);
        // Xóa document liên quan trong collection "markModel"
        await myMD.markModel.deleteMany({id_sv : studentList.id_sv, id_lop : id });

        msg = "Xóa Thành Công!"
    } catch (error) {
        msg = 'Lỗi' + error;
    }
    res.setHeader('Cache-Control', 'no-cache'); // Thêm header bắt buộc trình duyệt bỏ qua cache
    res.redirect(`/lop/listSV/${id}`);  // Load lại trang hiện tại
}





