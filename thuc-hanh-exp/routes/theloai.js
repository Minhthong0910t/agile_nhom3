var express = require('express');
var router = express.Router();
var tlCtrl = require('../controllers/sanpham.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});


router.get('/',check_login.yeu_cau_dang_nhap, tlCtrl.listtl);

router.get('/add',check_login.yeu_cau_dang_nhap, tlCtrl.addtl);
router.post('/add',check_login.yeu_cau_dang_nhap, tlCtrl.addtl);

//edit
router.get('/edit/:id',check_login.yeu_cau_dang_nhap, tlCtrl.edittl);
router.post('/edit/:id',check_login.yeu_cau_dang_nhap, tlCtrl.edittl);


//delete
router.get("/delete/:idtl",check_login.yeu_cau_dang_nhap,tlCtrl.deletetl);
router.delete("/delete/:idtl",check_login.yeu_cau_dang_nhap,tlCtrl.deletetl);



module.exports = router;
