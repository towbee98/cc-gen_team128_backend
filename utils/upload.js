const stream = require('node:stream');
const fs= require('node:fs');

const getDriveService=require('./driveService');


const uploadFile = async (fileObject,slugName) => {
    try{
  
        const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await getDriveService().files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: slugName,
      parents: ['1KrPuaqLyVzKhz0vH6MXPp0Ba7Ddu3k1Z'],
    },
    fields: 'id,name',
  });
  return data
    }catch(err){
        throw err
    }
  
};

const download= async (downloadFile,res,dest)=>{
   return getDriveService().files.get(
     {fileId:downloadFile.id,alt:'media'},{responseType:'stream'}, function(err,response){
         response.data.on('end',()=>{
     res.download(`./${downloadFile.name}.zip`)
    }).on('error',(err)=>{
        console.log(err, 'err')
        return res.status(500).json({status:'fail',message:err})
    }).pipe(dest)
     })
}
module.exports={uploadFile,download}