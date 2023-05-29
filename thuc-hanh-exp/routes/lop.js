var express = require('express');
var router = express.Router();
var lopCtrl = require('../controllers/lop.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});


router.get('/',check_login.yeu_cau_dang_nhap, lopCtrl.list);

router.get('/add',check_login.yeu_cau_dang_nhap, lopCtrl.add);
router.post('/add',check_login.yeu_cau_dang_nhap, lopCtrl.add);

//edit
router.get('/edit/:id',check_login.yeu_cau_dang_nhap, lopCtrl.edit);
router.post('/edit/:id',check_login.yeu_cau_dang_nhap, lopCtrl.edit);

router.get("/delete/:idsp",check_login.yeu_cau_dang_nhap,lopCtrl.delete);
router.delete("/delete/:idsp",check_login.yeu_cau_dang_nhap,lopCtrl.delete);

module.exports = router;
