var md=require('../../models/sanpham.models')

exports.list= async (req,res,next)=>{
    try {
        let products= await md.spModel.find().populate('idTL');
        if(products){
            return res.send(products)
                
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
    res.status(200).json({msg:'Danh sách tài khoản'});

}
exports.search= async (req, res, next)=>{
    console.log(req.body);
    let regex= new RegExp(req.body.searchQuery,"i");
    let listProduct= await md.spModel.find({tenSP:regex}).populate('idTL');

    if(listProduct){
        let modelList=listProduct.map(item=>{
            return{
                _id:item._id,
                tenSP: item.tenSP,
                giatien: item.giatien,
                noidung: item.noidung,
                img: item.img,
                tenTL: item.idTL.tenTL
            }
        });
        return res.status(201).json({data: modelList,msg:'lấy dữ liệu thành công'})
    }else{
        return res.status(204).json({msg:'không có dữ liệu'})
    }
}
exports.chitiet = async (req, res, next) => {
    try {
        const product = await md.spModel.findById(req.params.idsp);
        if (!product) {
          return res.status(404).send('Sản phẩm không tồn tại');
        }
        res.json(product);
      } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
      }
    
}


