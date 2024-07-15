import { prisma } from "../prismaClient";

export async function handleGetAnimationsList(req: any, res: any, next: any) {
  try {
    if (!req) res.status(404).send("No Request Found");
    await prisma.template
      .findMany({})
      .then((dbresolve) => {
        console.log(dbresolve);
        res.status(200).send(dbresolve);
      })
      .catch((dbreject) => {
        console.log(dbreject);
        res.status(400).send(dbreject);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export async function handleDeleteAnimation(req: any, res: any, next: any) {
    try
    {
        if (!req) res.status(404).send("No Request Found");
        const animationId=req.params.deleteId;
        await prisma.template.delete({where:{
            id:animationId
        }})
        .then((dbresolve)=>{
            console.log(dbresolve);
            res.sendStatus(200);
        })
        .catch((dbreject)=>{
            console.log(dbreject);
            res.status(400).send(dbreject);
        })

    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }

}
