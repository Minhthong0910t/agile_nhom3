const { log } = require('console');
var myMD = require('../models/user.models');

var fs = require('fs');
var msg = '';

exports.list = async (req, res, next) => {
    let page=req.params.i;  // trang
    let perPage=10;  // dữ liệu trang có 10
    let timkiemUser = null;
    if (req.query.user != '' && String(req.query.user) != 'undefined') {
        timkiemUser = { user: req.query.user }
    }
    let start=(page-1)*perPage; // vị trí 0
   
    let list = await myMD.userModel.find(timkiemUser).skip(start).limit(perPage);
    
    let countlist = await myMD.userModel.find(timkiemUser);
    let count = countlist.length / perPage;
    count = Math.ceil(count);

    console.log(list);
    res.render('user/list', { listUS: list, req: req , countPage: count , req: req , msg: msg});
}
exports.add = async (req, res, next) => {

    //lấy ds category truyền vào
    if (req.method == 'POST') {
        try {
            fs.renameSync(req.file.path, "./public/uploads/" + req.file.originalname);
            let url_file = '/uploads/' + req.file.originalname;

            if (req.file != undefined) {
                let objUS = new myMD.userModel();
                objUS.user = req.body.user;
                objUS.password = req.body.password;
                objUS.image = url_file;
                objUS.vaitro = req.body.vaitro;
                try {
                    let new_product = await objUS.save();
                    console.log(new_product);
    
                } catch (err) {
                    console.log(err);
                }
            } else {
                let objUS = new myMD.userModel();
                objUS.user = req.body.user;
                objUS.password = req.body.password;
                objUS.vaitro = req.body.vaitro;
                try {
                    let new_product = await objUS.save();
                    console.log(new_product);
    
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây
            console.log(error);
        }
        
    }
    res.render('user/add', {req: req, msg: msg});
}

exports.edit = async (req, res, next) => {
    let msg = '';
    let iduser = req.params.id;
    let objUser = await myMD.userModel.findById(iduser);
   

    if (req.method == 'POST') {

        if (req.file != undefined) {

            fs.renameSync(req.file.path, "./public/uploads/" + req.file.originalname);
            let url_file = '/uploads/' + req.file.originalname;

            try {

                let objUS = new myMD.userModel();
                objUS.user = req.body.user;
                objUS.password = req.body.password;
                req.file ? objUS.image = url_file :
                objUS.vaitro = req.body.vaitro;


                objUS._id = iduser;

                await myMD.userModel.findByIdAndUpdate(iduser, objUS);
                msg = 'Cập Nhật Thành Công'
            } catch (error) {
                msg = 'Lỗi Ghi CSDL: ' + error.message;
                console.log(error);
            }
        } else {
            try {
                let objUS = new myMD.userModel();
                objUS.user = req.body.user;
                objUS.password = req.body.password;
                objUS.vaitro = req.body.vaitro;

                objUS._id = iduser;

                await myMD.userModel.findByIdAndUpdate(iduser, objUS);
                msg = 'Cập Nhật Thành Công'
            } catch (error) {
                msg = 'Lỗi Ghi CSDL: ' + error.message;
                console.log(error);
            }
        }

    }

    

    res.render('user/edit', { msg: msg, objUS: objUser , req: req, msg: msg});
};
// delete



exports.deleteUser= async (req,res,next)=>{
    await myMD.userModel.deleteOne({_id: req.body.IdDelete});
    res.redirect('/user/1');

}


