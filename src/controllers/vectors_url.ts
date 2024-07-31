import { prisma } from "../prismaClient";
import { limit } from "../utils/types";

export async function handleGetVectorsNameSearch(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const currentSearchWord: string = req.params.currentSearchWord;
    await prisma.vectors_url
      .findMany({
        where: {
          name: {
            contains: currentSearchWord,
            mode: "insensitive",
          },
        },
      })
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

export async function handleGetHomePageVector(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const randNumber = Math.floor(Math.random() * 10);
    await prisma.vectors_url
      .findMany({
        take: 1,
        skip: randNumber,
      })
      .then((dbresolve) => {
        res.status(200).send(dbresolve);
      })
      .catch((dbreject) => {
        res.status(400).send(dbreject);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
