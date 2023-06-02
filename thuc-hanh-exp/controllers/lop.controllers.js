var myMD = require('../models/agile.models');
var msg = "";

exports.list = async (req, res, next) => {
    var msg = "";
    let list = await myMD.classModel.find();
    res.render('lop/list', { listClass: list, req: req , msg: msg});
}

exports.add = async (req, res, next) => {
    // lấy ds thể loại truyền ra view 
    let list = await myMD.classModel.find();

    if (req.method == "POST") {
        // viết kiểm tra hợp lệ dữ liệu...   
        // tạo đối tượng model để gán dữ liệu
        let objClass = new myMD.classModel();
        objClass.tenLop = req.body.tenLop;

        try {
            let new_Class = await objClass.save();
            console.log(new_Class);
            msg = "Đã thêm thành công";
        } catch (error) {
            msg = "Lỗi ghi CSDL" + error.message;
            console.log(error);
        }

    }
    res.render('lop/add', { msg: msg, list: list , req: req});
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


