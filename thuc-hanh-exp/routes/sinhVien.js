var express = require('express');
var router = express.Router();
var sinhVienCtrl = require('../controllers/sinhvien.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});


router.get('/',check_login.yeu_cau_dang_nhap, sinhVienCtrl.list);
router.get('/locID/:idtl',check_login.yeu_cau_dang_nhap,sinhVienCtrl.list)

router.get('/add',check_login.yeu_cau_dang_nhap, sinhVienCtrl.add);
router.post('/add',check_login.yeu_cau_dang_nhap, sinhVienCtrl.add);

router.get('/edit/:idsp',check_login.yeu_cau_dang_nhap, sinhVienCtrl.edit);
router.post('/edit/:idsp',check_login.yeu_cau_dang_nhap, sinhVienCtrl.edit);

//delete
router.post('/delete',sinhVienCtrl.delete);




module.exports = router;
