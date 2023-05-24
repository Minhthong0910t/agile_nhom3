const bcrypt = require('bcrypt');
exports.index = (req, res, next) => {
    let msg = '';
    res.render('home/index', { msg: msg });
}
exports.home = (req, res, next) => {

    res.render('home/home');
}
const md = require('../../models/user.models');
exports.Login = async (req, res, next) => {
    let msg='';
    if(req.method == 'POST'){
        
        try {
            
            let objUser=await md.userModel.findOne({user: req.body.user});
            console.log(objUser);
            if(!objUser){
                console.log("sai thông tin đnhap");
                return res.render('home/dn',{msg: 'Tài khoản không đúng vui lòng đăng nhập lại',req: req});
                
            }else{
                //có tồn tại tk
                const isPasswordMatch = await bcrypt.compare(req.body.password, objUser.password);
                if(!isPasswordMatch){
                    console.log("sai mk");
                return res.render('home/dn',{msg: 'bạn nhập sai mật khẩu vui lòng đăng nhập lại',req: req});
                    
                }else{
                    console.log("đăng nhập thành công");
                    req.session.userLogin=objUser;
                    return res.render('home/home');
                }
        }
        

        }catch (error) {
            console.log(error);
           
        }
       
    }
    return res.render('home/dn', { msg: msg });
    
}

exports.Reg = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        console.log(req.body);
        // kiểm tra hợp lệ dữ liệu
        if (req.body.password != req.body.passwd2) {
            msg = 'Xác nhận password không đúng';
            return res.render('home/dk', { msg: msg });
        } else {

            const salt = await bcrypt.genSalt(10);
            //tự viết thêm kiểm tra hợp lệ dữ liệu ở các trường khác
            let objU = new md.userModel();
            objU.user = req.body.user;
            objU.password = req.body.password;
            objU.img = req.body.img;
            objU.email = req.body.email;
            objU.vaitro = req.body.vaitro;
            objU.password= await bcrypt.hash(req.body.password,salt);
            try {
                await objU.save();
                msg = 'Đăng ký thành công';
            } catch (error) {
                msg = error.message;
            }
        }
    }

    res.render('home/dk', { msg: msg });
}
exports.Logout = (req, res, next) => {

}
