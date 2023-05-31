var diemModel = require('../models/agile.models');

exports.list = async(req, res, next) => {
    let listDiem = await diemModel.markModel.find().sort({diemThi: 1}).populate('id_monHoc');
    res.render('diem/list', {list: listDiem});
}

exports.add = async(req, res, next) => {

    res.render('diem/list');
}

exports.update = async(req, res, next) => {
    
    res.render('diem/list');
}

exports.delete = async(req, res, next) => {
  
    res.render('diem/list');
}

exports.chitiet = async(req, res, next) => {
 
    res.render('diem/list');
}