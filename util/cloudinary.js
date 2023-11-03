
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary=require('cloudinary');



cloudinary.config({
    cloud_name:process.env.cloudinary_cloud_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret,
});

//cloudinary upload image 
const cloudinaryUploadImage=async(fileToUpload)=>{

    try{
        const data=await cloudinary.uploader.upload(fileToUpload,{
            resource_type: "auto",
        });
        return data;
    }catch(error){
        return error;
    }
}
//cloudinary remove image 

const cloudinaryRemoveImage=async(imagepublicId)=>{

    try{
        const result=await cloudinary.uploader.destroy(imagepublicId);
        return result;
    }catch(error){
        return error;
    }
}



module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage
}