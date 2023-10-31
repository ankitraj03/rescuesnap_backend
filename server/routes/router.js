const express= require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment");

var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    }, 
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`);
    }

});


const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }
    else{
        callback(null,Error("Only image is allowed"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

router.post("/register",upload.single("photo"),(req,res)=>{
    const {disaster} = req.body;
    // const {latitude} = req.body;
    // const {longitude} = req.body;
    const {filename} = req.file;

    console.log("data");
    if(!disaster || !filename){
        res.status(422).json({status:422,message:"fill all the details"})
    }

    try{
         let date = moment(new Date()).format("YYYY-MM-DD  hh:mm:ss");
         conn.query("INSERT INTO userdata SET ?", {disname:disaster,disimg:filename,date:date},(err,result)=>{
            if(err){
                console.log("data base error")
            }
            else{
                console.log("data added")
                res.status(201).json({status:201,data:req.body})
            }
         })
    }
    catch(error)
    {
        res.status(422).json({status:422,error})
    }
});

router.get("/getdata",(req,res)=>{
    try{
        conn.query("SELECT * FROM userdata",(err,result)=>{
            if(err){
                console.log("data base error")
            }
            else{
                console.log("data got")
                res.status(201).json({status:201,data:result})
            }
        })
    }catch(error){
        res.status(422).json({status:422,error})
    }
})

module.exports = router;