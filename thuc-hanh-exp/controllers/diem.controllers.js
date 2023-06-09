var diemModel = require('../models/agile.models');

exports.list = async(req, res, next) => {
    let listDiem = await diemModel.markModel.find().sort({diemThi: 1}).populate('id_monHoc');
    res.render('diem/list', {list: listDiem, req: req});
}

const addMarkToStudent = async (id_sv, id_diem) => {
    try {
      const updatedStudent = await diemModel.studentListModel.findOneAndUpdate(
        { id_sv: id_sv },
        { $push: { id_diem: id_diem } },
        {new: true} 
      );
  
      return updatedStudent;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


exports.add = async(req, res, next) => {
    let msg = '';
    let listMH = await diemModel.subjectModel.find().sort({tenMH: 1});
    if(req.method == 'POST'){
        let objDiem = new diemModel.markModel();
        objDiem.diemQuiz = req.body.diemQuiz;
        objDiem.diemLab = req.body.diemLab;
        objDiem.diemASM = req.body.diemASM;
        objDiem.diemThi = req.body.diemThi;
        objDiem.id_monHoc = req.body.tenMH;

        let objStdList = new diemModel.studentListModel();
        objStdList.id_diem = objDiem._id;

        try{
            await objDiem.save();
            await addMarkToStudent(id_sv, objDiem);
            objStdList = await objStdList.save();
            
            msg = 'Thêm thành công';
        } catch (err){
            msg = 'Thêm thất bại'
            console.log(err);
        }
    }
    res.render('diem/add', {req: req, msg: msg, listMH: listMH});
}

exports.update = async(req, res, next) => {
    let msg = '';
    let idmh = req.params.idsp;
    let listMH = await diemModel.subjectModel.find().sort({tenMH: 1});
    let objDiem = await diemModel.markModel.findById(idmh);
    if(req.method == 'POST'){
        let objDiem = new diemModel.markModel();
        objDiem.diemQuiz = req.body.diemQuiz;
        objDiem.diemLab = req.body.diemLab;
        objDiem.diemASM = req.body.diemASM;
        objDiem.diemThi = req.body.diemThi;
        objDiem.id_monHoc = req.body.tenMH;
        objDiem._id = idmh;
        try{
            await diemModel.markModel.findByIdAndUpdate(idmh, objDiem);
            msg = 'Sửa thành công';
        } catch (err){
            msg = 'Sửa thất bại'
            console.log(err);
        }
    }
    res.render('diem/edit', {req: req, msg: msg, objDiem: objDiem, listMH: listMH});
}

exports.delete = async(req, res, next) => {
    let idsp = req.params.idsp;
    let objDiem = await diemModel.markModel.findById(idsp);
    try {
        await diemModel.markModel.findByIdAndRemove(idsp, objDiem);
        console.log("Xóa thành công");
        res.redirect('/diem');
    } catch (err) {
        console.log('Xóa thất bại');
    }
}

exports.chitiet = async(req, res, next) => {
 
    res.render('diem/list');
}