var mysql=require('mysql2');
var con=mysql.createConnection({
    host:"localhost",
    user:"user",
    password:"1234",
});
con.connect((err)=>
{
    if (err) throw err;
    console.log("connected successfully");
    q="CREATE DATABASE ngo"
    con.query(q,(err,result)=>{
        if (err) throw err;
        console.log("Database created successfully");
    });
});