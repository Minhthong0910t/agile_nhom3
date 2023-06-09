var myModel = require('../models/agile.models');
const mongoose = require('mongoose');


exports.list = async(req, res, next) => {
    let msg = '';
    let timKiem = null;
    if (req.query.tenSV != '' && String(req.query.tenSV) != 'undefined') {
        timKiem = { tenSV: req.query.tenSV }
    }
    let list = await myModel.studentModel.find(timKiem);
    let listds = await myModel.studentListModel.find().populate('id_sv').populate('id_diem').populate('id_lop');
    res.render('sinhvien/list', {req: req, msg: msg, list: listds});
}

exports.add = async(req, res, next) => {
    let msg = '';
    if(req.method == 'POST'){

        try {
            // Lấy danh sách tất cả các MSSV đã tồn tại
            const existingStudents = await myModel.studentModel.find().select('_id');
        
            let MSSV;
        
            while (true) {
              // Tạo MSSV ngẫu nhiên
              MSSV = 'PH' + Math.floor(Math.random() * 100000);
        
         // Kiểm tra xem MSSV mới tạo có bị trùng lặp không
              const existingMSSV = existingStudents.some(student => student._id === MSSV);
              if (!existingMSSV) break; // Nếu không trùng lặp, thoát vòng lặp
            }
            // Gán giá trị MSSV vào _id
            const newStudent = new myModel.studentModel({ _id: MSSV, tenSV : req.body.tenSV , gioiTinh : req.body.gioiTinh, ngaySinh : req.body.ngaySinh});

            let objStdList = new myModel.studentListModel();
            objStdList.id_sv = newStudent._id;

            // Lưu tài khoản mới vào cơ sở dữ liệu
            await objStdList.save();
            await newStudent.save();
            msg = 'Thêm thành công';
          } catch (error) {
            msg = 'Thêm thất bại'
            console.log(error);
          }
        
        
    }
    res.render('sinhvien/add', {req: req, msg: msg});
}

exports.edit = async(req, res, next) => {
    let msg = '';
    let idsv = req.params.idsv;
    let objStudent = await myModel.studentModel.findById(idsv);
    if(req.method == 'POST'){
        let objStudent = new myModel.studentModel();
        objStudent.tenSV = req.body.tenSV;
        objStudent.gioiTinh = req.body.gioiTinh;
        objStudent.ngaySinh = req.body.ngaySinh;
        objStudent._id = idsv;
        try{
            await myModel.studentModel.findByIdAndUpdate(idsv, objStudent);
            msg = 'Sửa thành công';
        } catch (err){
            msg = 'Sửa thất bại'
            console.log(err);
        }
    }
    res.render('sinhvien/edit', {req: req, msg: msg, objStudent: objStudent});
}

exports.delete= async (req,res,next)=>{
    const studentList = await myModel.studentListModel.findById(req.body.IdDelete);
    if (!studentList) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy document' });
    }

    // Xóa document sinh viên trong collection "studentModel   
    await myModel.studentModel.deleteOne({_id: studentList.id_sv});

    // Xóa document liên quan trong collection "markModel"
    await myModel.markModel.deleteOne({_id: studentList.id_diem});
    
    // Xóa document sinh viên trong collection "studentListModel"
    await myModel.studentListModel.deleteOne({_id: req.body.IdDelete});

    res.redirect('/sinhVien');  
}
