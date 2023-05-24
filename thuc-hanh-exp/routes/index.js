var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/home.controllers');
var check_login = require('../middlewares/check_login');


router.use( (req, res, next) => {
    console.log("---- Dòng này là middleware ---- ");
    next();
});

router.get('/home',check_login.yeu_cau_dang_nhap, homeCtrl.home);


router.get('/', homeCtrl.index);

router.get('/dn',homeCtrl.Login );
router.post('/dn',homeCtrl.Login );

router.get('/dk',homeCtrl.Reg );
router.post('/dk',homeCtrl.Reg );



module.exports = router;
