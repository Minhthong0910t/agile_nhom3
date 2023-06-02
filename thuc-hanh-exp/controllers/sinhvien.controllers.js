var myModel = require('../models/agile.models');

exports.list = async(req, res, next) => {
    let msg = '';
    let list = await myModel.studentModel.find();
    res.render('sinhvien/list', {req: req, msg: msg, list: list});
}

exports.add = async(req, res, next) => {
    let msg = '';
    if(req.method == 'POST'){
        let objStudent = new myModel.studentModel();
        objStudent.tenSV = req.body.tenSV;
        objStudent.gioiTinh = req.body.gioiTinh;
        objStudent.ngaySinh = req.body.ngaySinh;

        try{
            let o = await objStudent.save();
            console.log(o);
            msg = 'Thêm thành công';
        } catch (err){
            msg = 'Thêm thất bại'
            console.log(err);
        }
    }
    res.render('sinhvien/add', {req: req, msg: msg});
}

exports.edit = async(req, res, next) => {
    let msg = '';
    let idmh = req.params.idsp;
    let objStudent = await myModel.studentModel.findById(idmh);
    if(req.method == 'POST'){
        let objStudent = new myModel.studentModel();
        objStudent.tenSV = req.body.tenSV;
        objStudent.gioiTinh = req.body.gioiTinh;
        objStudent.ngaySinh = req.body.ngaySinh;
        objStudent._id = idmh;
        try{
            await myModel.studentModel.findByIdAndUpdate(idmh, objStudent);
            msg = 'Sửa thành công';
        } catch (err){
            msg = 'Sửa thất bại'
            console.log(err);
        }
    }
    res.render('sinhvien/edit', {req: req, msg: msg, objStudent: objStudent});
}

exports.delete= async (req,res,next)=>{
    await myModel.studentModel.deleteOne({_id: req.body.IdDelete});
    res.redirect('/sinhvien');
}