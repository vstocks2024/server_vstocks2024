import { prisma } from "../prismaClient";

export async function handleGetTagByVector(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const vector_id = req.params.vectorId;
    await prisma.vector_tag
      .findMany({
        select: {
          tag_id: true,
        },
        where: {
          vector_id: vector_id,
        },
      })
      .then(async (dbresolve1) => {
        console.log(dbresolve1);
        await prisma.vector_tag
          .findMany({
            where: {
              OR: dbresolve1,
              NOT:{
                vector_id:vector_id
              }
            },
          })
          .then(async (dbresolve2) => {
            // let uniqueArray:any[]=[];
            // dbresolve2.forEach(item => {
            //     if (uniqueArray.findIndex(element => element.vector_id === item.vector_id) === -1) {
            //         uniqueArray.push(item);
            //     }
            // });
            // res.status(200).send(uniqueArray);
            res.status(200).send(dbresolve2);
          })
          .catch((dbreject2) => {
            res.status(400).send(dbreject2);
          });
      })
      .catch((dbreject1) => {
        console.log(dbreject1);
        res.status(400).send(dbreject1);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
