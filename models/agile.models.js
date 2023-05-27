var db = require('./db');

const studentSchema = new db.mongoose.Schema(
    {
        tenSV: {type: String, require: true},
        gioiTinh: {type: String, require: true},
        ngaySinh: {type: String, require: true}
    }, {collection: 'sinhVien'}
);
let studentModel = db.mongoose.model('studentModel', studentSchema);

const classSchema = new db.mongoose.Schema(
    {
        tenLop: {type: String, require: true}
    }, {collection: 'lop'}
);
let classModel = db.mongoose.model('classModel', classSchema);

const markSchema = new db.mongoose.Schema(
    {
        diemQuiz: {type: Number, require: true},
        diemLab: {type: Number, require: true},
        diemASM: {type: Number, require: true},
        diemThi: {type: Number, require: true},
        id_monHoc: {type: db.mongoose.Schema.Type.ObjectId, ref: 'subjectModel'}
    }, {collection: 'diem'}
);
let markModel = db.mongoose.model('markModel', markSchema);

const subjectSchema = new db.mongoose.Schema(
    {
        tenMH: {type: String, require: true},
        tinChi: {type: Number, require: true}
    }, {collection: 'monHoc'}
);
let subjectModel = db.mongoose.model('subjectModel', subjectSchema);

const studentListSchema = new db.mongoose.Schema(
    {
        id_lop: {type: db.mongoose.Schema.Type.ObjectId, ref: 'subjectModel'},
        id_sv: {type: db.mongoose.Schema.Type.ObjectId, ref: 'studentModel'},
        id_diem: {type: db.mongoose.Schema.Type.ObjectId, ref: 'markModel'}
    }, {collection: 'dsSinhVien'}
);
let studentListModel = db.mongoose.model('studentListModel', studentListSchema);

module.exports = {studentListModel, studentModel, classModel, markModel, subjectModel}