var express = require('express');
var router = express.Router();
var spCtrl = require('../controllers/sanpham.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});


router.get('/',check_login.yeu_cau_dang_nhap, spCtrl.list);
router.get('/locID/:idtl',check_login.yeu_cau_dang_nhap,spCtrl.list)

router.get('/add',check_login.yeu_cau_dang_nhap, spCtrl.add);
router.post('/add',check_login.yeu_cau_dang_nhap, spCtrl.add);

router.get('/edit/:idsp',check_login.yeu_cau_dang_nhap, spCtrl.edit);
router.post('/edit/:idsp',check_login.yeu_cau_dang_nhap, spCtrl.edit);

//delete
router.get("/delete/:idsp",check_login.yeu_cau_dang_nhap,spCtrl.delete);
router.delete("/delete/:idsp",check_login.yeu_cau_dang_nhap,spCtrl.delete);

router.get('/CTSP/:idsp',check_login.yeu_cau_dang_nhap, spCtrl.chitiet);


module.exports = router;
