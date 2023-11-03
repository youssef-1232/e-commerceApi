const path=require("path")
// eslint-disable-next-line import/no-extraneous-dependencies
const multer=require("multer")


//storge
const photoStorge=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../images"));
    },
    filename:function(req,file,cb){
        
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname);
        }else{
            cb(null,false)
        }
    }
});


//photo upload midllware
const photoUpload=multer({
    storage:photoStorge,

    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message:"unsported file format"},false);
        }
    },
    limits:{fileSize:1024*1024}//1 mega
 
})


module.exports=photoUpload;