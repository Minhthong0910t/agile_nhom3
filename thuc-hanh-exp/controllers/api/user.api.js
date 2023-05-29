var md = require('../../models/user.models')
const bcrypt = require('bcrypt');
exports.list= async (req,res,next)=>{
    try {
        let listUser= await md.userModel.find();
        if(listUser){
            return res.status(200).json(
                {
                    msg:'lấy dữ liệu thành công',
                    data: listUser
                }
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'không có dữ liệu'
                }
            );
        }
    } catch (error) {
        return res.status(error.status)
                .json({
                    msg:error.message

                });
    }
}
exports.login= async (req,res,next)=>{
    console.log(req.body);
    
    try {
        const user = await md.userModel.findOne({user: req.body.user});
        console.log(user);
        if (!user) {
            console.log("Không tồn tại tài khoản");
            return res.status(500).json({msg: "sai thông tin đăng nhập"})
        }else{
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                console.log("sai mật khẩu");
                return res.status(500).json({msg: "sai mật khẩu"})
            }else{
                console.log('Đăng nhập thành công');
                return res.status(201).json({ msg: "Đăng nhập thành công"})
            }
        }        
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Sai tài khoản hoặc mật khẩu"})
        
    }

}
exports.register= async (req, res,next) => {
    console.log(req.body);

    try {
        const salt =await bcrypt.genSalt(10);
        const user= new md.userModel(req.body);
        user.password=await bcrypt.hash(req.body.password,salt);


        let new_u=await user.save();
        return res.status(201).json({user:new_u});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message})
    }
}

