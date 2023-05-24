var express=require('express');
var router=express.Router();

const bodyParser=require('body-parser');

var tableController=require('../controllers.lab3/table.controller');

router.get('/',tableController.getTable);

router.use(bodyParser.urlencoded({extended:false}));

router.post('/register',function(req,res){

    //lấy dữ liệu từ body của request
    const{Fullname,username,password,email,group}=req.body;
    const status=req.body.status==='on'?'checked':'null';
    //xử lý dữ liệu, thêm user vào mảng users
    const newUser={Fullname,username,password,email,group,status};
    tableController.addUser(newUser);

    res.redirect('/table');

});
module.exports=router;