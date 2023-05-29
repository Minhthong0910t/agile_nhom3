const { log } = require('console');
var myMD = require('../models/user.models');

var fs = require('fs');

exports.list = async (req, res, next) => {
    let page=req.params.i;  // trang
    let perPage=10;  // dữ liệu trang có 10
    let timkiemUser = null;
    if (req.query.user != '' && String(req.query.user) != 'undefined') {
        timkiemUser = { user: req.query.user }
    }
    let start=(page-1)*perPage; // vị trí 0
   
    let list = await myMD.userModel.find(timkiemUser).skip(start).limit(perPage);
    let msg = list.length + " sản phẩm";

    let countlist = await myMD.userModel.find(timkiemUser);
    let count = countlist.length / perPage;
    count = Math.ceil(count);

    console.log(list);
    res.render('user/list', { listUS: list, req: req , countPage: count , req: req});
}
exports.add = async (req, res, next) => {
    var url_image = '';
    let msg = '';
    //lấy ds category truyền vào
    if (req.method == 'POST') {
        try {
            await fs.rename(
                req.file.path,
                "./public/uploads/" + req.file.originalname,
                function (err) {
                    if (err) throw err;
                    //không có lỗi ==> upload thành công
                    url_image = "/uploads/" + req.file.originalname;
                    console.log("upload thanh cong" + url_image);
                }
            );
        } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây
            console.log(error);
        }
        if (req.file != undefined) {
            let objUS = new myMD.userModel();
            objUS.user = req.body.user;
            objUS.password = req.body.password;
            objUS.img = req.file.originalname;
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
    }
    res.render('user/add', {req: req});
}

exports.edit = async (req, res, next) => {
    let msg = '';
    let iduser = req.params.id;
    let objUser = await myMD.userModel.findById(iduser);
    console.log(objUser);

    if (req.method == 'POST') {
        try {
            let updatedUser = {
                user: req.body.user,
                password: req.body.password,
                vaitro: req.body.vaitro
            };

            // Kiểm tra xem người dùng đã tải lên tệp hình ảnh hay chưa
            if (req.file !== undefined) {
                try {
                    const newImagePath = "./public/uploads/" + req.file.originalname;
                    await fs.rename(req.file.path, newImagePath);

                    // Cập nhật đường dẫn hình ảnh mới vào đối tượng người dùng
                    const urlImage = "/uploads/" + req.file.originalname;
                    updatedUser.img = urlImage;
                } catch (error) {
                    console.error(error);
                }
            }

            try {
                await myMD.userModel.findByIdAndUpdate(iduser, updatedUser);
                console.log(updatedUser);
            } catch (err) {
                console.error(err);
            }
        } catch (err) {
            console.error(err);
        }
    }

    res.render('user/edit', { msg: msg, objUS: objUser , req: req});
};
// delete


exports.delete = async (req, res, next) => {
    await myMD.userModel.deleteOne({
        _id: req.params.idus
    });
    console.log("delete thành công:" + req.params.idus);
    res.redirect("/user");

}


