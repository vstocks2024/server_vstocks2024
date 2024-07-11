import {prisma} from '../prismaClient';
import {  deleteVideoFileFromBucket,listBucketVideosFiles, uploadFile } from '../utils/s3';
import { ErrorResponse, SuccessResponse } from '../utils/statusmessage';


export  async function handleListVideo(req:any,res:any,next:any)
{
    try{
        if(!req) return res.send(new ErrorResponse(404,"Not Found"))
        await prisma.video.findMany()
       .then(async(dbresolve)=>{
        ////console.log(dbresolve);
        res.send(new SuccessResponse(200,"Success",dbresolve));
        })
        .catch(async(dbreject)=>
        {
            //console.log(dbreject);
            res.send(new ErrorResponse(400,String(dbreject)));
        })
    }
    catch(err){
    //console.log(err);
    res.send(new ErrorResponse(404,String(err)));
    }
}

export async function handleUploadVideo(req:any,res:any,next:any)
{
       try{
        if(!req) return res.send(new ErrorResponse(404,"Not Found"))
        const file = req.file
        const videoName = `${file.originalname}`;
        const filetype=`${file.mimetype}`;
        ////console.log("filetype",filetype);
        const fileBuffer = file.buffer;
        await prisma.video.create({data:{video_name:videoName}})
        .then(async (dbresolve)=>
        {
            //console.log(dbresolve);
            await uploadFile(fileBuffer,`users/uploads/videos/category/mahashivaratri/${dbresolve.id}`, filetype )
            .then((s3resolve)=>
            {
                //console.log(s3resolve);
                res.send(new SuccessResponse(200,"Success",s3resolve))
            })
            .catch((s3reject)=>
            {
                //console.log(s3reject);
                res.send(new ErrorResponse(400,String(s3reject)))
            })
        })
        .catch((dbreject)=>{
          //console.log(dbreject)
         res.send(new ErrorResponse(404,String(dbreject)));
         });
        }
    catch(err){
        //console.log(err);
    res.send(new ErrorResponse(400,String(err)))
    }
}

export async function handleDeleteVideoFromBucketAndDatabase(req:any,res:any,next:any) {

 if(!req) new ErrorResponse(404,"No Request Found")
    try{
  const videoid=req.params.videoid;
  console.log(videoid);
  await deleteVideoFileFromBucket(videoid).then(async(res:any)=>{
    if( !res || res["$metadata"]["httpStatusCode"]!=204) return;
    try{
        await prisma.video.delete({
          where: {
            id:videoid,
          },
        }).then((dbresolve)=>{
    
          console.log(dbresolve);
          return new SuccessResponse(200,"Success",dbresolve);
        }).catch((dbreject)=>{
          console.log(dbreject);
          return new ErrorResponse(404,"Issue in DB");
        })
      }
      catch(error){
        console.log(error);
      }
      
  
    }).catch(async(rej)=>{
      console.log(rej);
    })
    
  
      }
      catch(error){
        return new ErrorResponse(500,"Internal server error")
      }
    }


  export default function handleDashboardUploadVideo(req:any,res:any,next:any){
    

  }