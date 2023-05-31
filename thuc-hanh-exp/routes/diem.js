var express = require('express');
var router = express.Router();
var diemCtrl = require('../controllers/diem.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});


router.get('/',check_login.yeu_cau_dang_nhap, diemCtrl.list);
router.get('/locID/:idtl',check_login.yeu_cau_dang_nhap, diemCtrl.list)

router.get('/add',check_login.yeu_cau_dang_nhap, diemCtrl.add);
router.post('/add',check_login.yeu_cau_dang_nhap, diemCtrl.add);

router.get('/update/:idsp',check_login.yeu_cau_dang_nhap, diemCtrl.update);
router.post('/update/:idsp',check_login.yeu_cau_dang_nhap, diemCtrl.update);

//delete
router.get("/delete/:idsp",check_login.yeu_cau_dang_nhap, diemCtrl.delete);
router.delete("/delete/:idsp",check_login.yeu_cau_dang_nhap, diemCtrl.delete);

router.get('/CTSP/:idsp',check_login.yeu_cau_dang_nhap, diemCtrl.chitiet);


module.exports = router;
