let objects=[
    {id:1, Fullname:"Tiêu Công Hạnh",username:"hanhdz",email:"hanhtcph21483@fpt.edu.vn",group:"CP17306",status:"checked"},
    {id:2, Fullname:"Nguyễn Minh A",username:"bird",email:"a127y127@fpt.edu.vn",group:"CP17308",status:"checked"},
    {id:3, Fullname:"Hoàng Văn B",username:"fly",email:"b2782168h@fpt.edu.vn",group:"CP17309",status:"null"},
    {id:4, Fullname:"Bùi Minh C",username:"vip",email:"choangminh271@fpt.edu.vn",group:"CP17306",status:"checked"},
    {id:5, Fullname:"Trần Hoàng Minh D",username:"bbdd",email:"dhoangminh2671@fpt.edu.vn",group:"CP17310",status:"null"},
];
exports.getTable=(req,res,next)=>{
    res.render('../views/table.view.ejs',{objects: objects})
};
exports.addUser=(user)=>{
    objects.push(user);
};