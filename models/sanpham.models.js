var db = require('./db');
// định nghãi khuôn mẫu
const spSchema = new db.mongoose.Schema(
    {
        //  định nghãi khuỗn mẫu với key khi lưu lên server
        tenSP: { type: String, require: true },
        giatien: { type: Number, require: true },
        img: { type: String, require: true },
        noidung: { type: String, require: true },
        idTL: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tlModel'}
    },
    {
        // gọi tới tên bảng
        collection: 'sanPham'
    }
);
// đĩnh nghĩa models
let spModel = db.mongoose.model('spModel', spSchema);
     
// viết cho thể loại
const tlSchema = new db.mongoose.Schema(
    {
       tenTL: {type:String, require: true},
       img: {type: String, require:true}
    },
    {
        collection: 'theLoai'
    }
);
let tlModel = db.mongoose.model('tlModel', tlSchema);
module.exports = {spModel, tlModel};
