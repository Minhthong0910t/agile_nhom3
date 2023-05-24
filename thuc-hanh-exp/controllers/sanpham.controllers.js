var myMD = require('../../models/sanpham.models');
exports.list = async (req, res, next) => {
    let dieu_kien_loc = null;
    if( req.params.idtl != '0'){
        if(typeof(req.params.idtl) != 'undefined' ){
            dieu_kien_loc = {idTL: req.params.idtl}
            console.log("đã lọc: "+req.params.idtl);       
        }
    }
    const by = req.query.by || 'giatien'; // Sắp xếp theo giá nếu không có giá trị by
  const order = req.query.order || 'asc'; // Sắp xếp tăng dần nếu không có giá trị order

   let list = await myMD.spModel.find(dieu_kien_loc).populate('idTL').sort({ [by] :order });
    let listTL = await myMD.tlModel.find(); 
    console.log(list);
    res.render('sanpham/list', { listSP: list, listTL: listTL, idTheLoai: req.params.idtl , by : by, order :order});
}
exports.add = async (req, res, next) => {
    let msg = "";

    // lấy ds thể loại truyền ra view 
    let listTL = await myMD.tlModel.find();

    if (req.method == "POST") {
        // viết kiểm tra hợp lệ dữ liệu...   
        // tạo đối tượng model để gán dữ liệu
        let objSP = new myMD.spModel();
        objSP.tenSP = req.body.tenSP;
        objSP.giatien = req.body.giatien;
        objSP.img = req.body.img;
        objSP.noidung = req.body.noidung;

        objSP.idTL = req.body.theloai;
        // thực hiện ghi vào CSDL
        try {
            let new_sp = await objSP.save();
            console.log(new_sp);
            msg = "đã thêm thành công";
        } catch (error) {
            msg = "lỗi ghi CSDL" + error.message;
            console.log(error);
        }

    }
    res.render('sanpham/addSP', { msg: msg, listTL: listTL });
}
exports.edit = async (req, res, next) => {
    let msg = '';
    let idsp = req.params.idsp;
    let listTL = await myMD.tlModel.find();
    let objSP = await myMD.spModel.findById(idsp);
    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...   
        // tạo đối tượng model để gán dữ liệu
        let objSP = new myMD.spModel();
        objSP.tenSP = req.body.tenSP;
        objSP.idTL = req.body.theloai;
        objSP.giatien = req.body.giatien;
        objSP.img = req.body.img;
        objSP.noidung = req.body.noidung;

        objSP._id = idsp; // thực hiển gọi tới sửa
        // thực hiện ghi vào CSDL
        try {
            await myMD.spModel.findByIdAndUpdate(idsp, objSP);
            msg = "đã cập nhập thành công";
        } catch (error) {
            msg = "lỗi ghi CSDL" + error.message;
            console.log(error);
        }
    }
    res.render('sanpham/editSP', { msg: msg, objSP: objSP, listTL: listTL });
}
exports.chitiet = async (req, res, next) => {
    let idsp = req.params.idsp;
    let listTL = await myMD.tlModel.find();
    let objSP = await myMD.spModel.findById(idsp);

    res.render('sanpham/CTSP', { objSP: objSP, listTL: listTL });
}
exports.delete = async (req, res, next) => {
    await myMD.spModel.deleteOne({ _id: req.params.idsp });
    console.log("delete thành công:" + req.params.idsp);
    res.redirect("/sp");
}








// thể loại
exports.listtl = async (req, res, next) => {
    let dieu_kien_loc = null;
    let listtl = await myMD.tlModel.find(dieu_kien_loc);
    res.render('sanpham/theloai', { listtL: listtl });
}
exports.addtl = async (req, res, next) => {
    let msg = "";
    let list = await myMD.tlModel.find();
    console.log(list);
    if (req.method == "POST") {
        // viết kiểm tra hợp lệ dữ liệu...
        // tạo đối tượng model để gán dữ liệu
        let objSP = new myMD.tlModel();
        objSP.tenTL = req.body.tenTL;
        objSP.img = req.body.img;
        // thực hiện ghi vào CSDL
        try {
            let new_sp = await objSP.save();
            console.log(new_sp);
            msg = "đã thêm thành công";
        } catch (error) {
            msg = "lỗi ghi CSDL" + error.message;
            console.log(error);
        }
    }
    res.render('sanpham/addTL', { listtL: list, msg: msg });
}
exports.edittl = async (req, res, next) => {
    let msg = '';
    let idTL = req.params.id;
    let objTL = await myMD.tlModel.findById(idTL);
    console.log(objTL);
    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...   
        // tạo đối tượng model để gán dữ liệu
        let objTL = new myMD.tlModel();
        objTL.tenTL = req.body.tenTL;
        objTL.img = req.body.img;

        objTL._id = idTL; // thực hiển gọi tới sửa
        // thực hiện ghi vào CSDL
        try {
            await myMD.tlModel.findByIdAndUpdate(idTL, objTL);
            msg = "đã cập nhập thành công";
            res.redirect("/tl")
        } catch (error) {
            msg = "lỗi ghi CSDL" + error.message;
            console.log(error);
        }
    }
    res.render('sanpham/editTL', { msg: msg, objTL: objTL });
}

// delete
exports.deletetl = async (req, res, next) => {
    await myMD.tlModel.deleteOne({ _id: req.params.idtl });
    console.log("delete thành công:" + req.params.idtl);
    res.redirect("/tl");
}


