import { prisma } from "../prismaClient";
export async function handleGetAnimationsUrlListAll(
  req: any,
  res: any,
  next: any
) {
  if (!req) return res.status(404).send("Request Not Found");
  await prisma.animations_url
    .findMany({})
    .then((dbresolve) => {
      res.status(200).send(dbresolve);
    })
    .catch((dbreject) => {
      res.status(400).send(dbreject);
    });
}

export async function handleGetOneAnimation(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");

    const countAnimation: number = await prisma.animations_url.count({
      where: {
        orientation: "Horizontal",
      },
    });
    const randNumber: number = Math.floor(Math.random() * countAnimation - 1);
    await prisma.animations_url
      .findMany({
        take: 1,
        skip: randNumber,
        where: {
          orientation: "Horizontal",
        },
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

export async function handleGetNewAddedAnimations(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const countAnimation: number = await prisma.animations_url.count({
      where: {
        orientation: "Horizontal",
      },
    });
    const randNumber: number = Math.floor(Math.random() * (countAnimation - 4));
    await prisma.animations_url
      .findMany({
        take: 4,
        skip: randNumber,
        where: {
          orientation: "Horizontal",
        },
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
export async function handleGetRecommended1Animations(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const countAnimation: number = await prisma.animations_url.count({
      where: {
        orientation: "Horizontal",
      },
    });
    const randNumber: number = Math.floor(Math.random() * (countAnimation));
    await prisma.animations_url
      .findMany({
        take: 1,
        skip: randNumber,
        where: {
          orientation: "Horizontal",
        },
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
export async function handleGetRecommended2Animations(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const countAnimation: number = await prisma.animations_url.count({
      where: {
        orientation: "Horizontal",
      },
    });
    const randNumber: number = Math.floor(Math.random() * (countAnimation - 4));
    await prisma.animations_url
      .findMany({
        take: 4,
        skip: randNumber,
        where: {
          orientation: "Horizontal",
        },
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



