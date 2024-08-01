import { prisma } from "../prismaClient";
export async function handleGetAnimationsUrlListAll(req: any, res: any, next: any){

    if (!req) return res.status(404).send("Request Not Found");
    await prisma.animations_url.findMany({})
    .then((dbresolve)=>{
         res.status(200).send(dbresolve);
    })
    .catch((dbreject)=>{
          res.status(400).send(dbreject);
    })

}