import { prisma } from "../prismaClient";

export async function handleGetCategoryByVector(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const vector_id = req.params.vectorId;
    await prisma.vector_category
      .findMany({
        select: {
          category_id: true,
        },
        where: {
          vector_id: vector_id,
        },
      })
      .then(async (dbresolve1) => {
        console.log(dbresolve1);
        await prisma.vector_category
          .findMany({
            select: {
              vector_id: true,
            },
            where: {
              OR: dbresolve1,
              NOT: {
                vector_id: vector_id,
              },
            },
          })
          .then(async (dbresolve2) => {
            await prisma.vectors_url
              .findMany({
                where: {
                  OR: dbresolve2,
                },
              })
              .then((dbresolve3) => {
                console.log(dbresolve3);
                res.status(200).send(dbresolve3);
              })
              .catch((dbreject3) => {
                res.status(400).send(dbreject3);
              });
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

export async function handleGetVectorByCategoryName(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const categoryname = req.params.categoryName;
    const currentpage = req.params.currentPage;
    const license = req.params.license;
    let licenses:string[]=[];

    if (license==="both"){
      licenses=[...licenses,"free","license"];
    }
    else{
      licenses=[...licenses,license];
    }
    await prisma.category
      .findUnique({
        select: {
          id: true,
        },
        where: {
          name: categoryname,
        },
      })
      .then(async (dbresolve1) => {
        await prisma.vector_category
          .findMany({
            skip: (currentpage - 1) * 2,
            take: 2,
            select: {
              vector_id: true,
            },
            where: {
              category_id: dbresolve1?.id,
            },
          })
          .then(async (dbresolve2) => {
            let vector_id_arr: string[] = [];
            dbresolve2.forEach((ele) => {
              vector_id_arr = [...vector_id_arr, ele.vector_id];
            });
            await prisma.vectors_url
              .findMany({
                where: {
                  vector_id: { in: vector_id_arr },
                  license : {in : licenses},
                },
              })
              .then((dbresolve3) => {
                res.status(200).send(dbresolve3);
              })
              .catch((dbreject3) => {
                console.log(dbreject3);
                res.status(400).send(dbreject3);
              });
          })
          .catch((dbreject2) => {
            console.log(dbreject2);
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

export async function handleGetTotalVectorPagesByCategoryName(
  req: any,
  res: any,
  next: any
) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const currentpage: number = Number(req.params.currentPage);
    const categoryname: string = req.params.categoryName;
    const limit: number = 2;
    let totalVectors: number = 0;

    await prisma.category
      .findUnique({
        where: {
          name: categoryname,
        },
      })
      .then(async (dbresolve1) => {
        await prisma.vector_category
          .count({
            where: {
              category_id: dbresolve1?.id,
            },
          })
          .then((dbresolve2) => {
            totalVectors = dbresolve2;
            const totalPages =
              totalVectors / limit === Math.floor(totalVectors / limit)
                ? Math.floor(totalVectors / limit)
                : Math.floor(totalVectors / limit) + 1;
            res
              .status(200)
              .send({ currentPage: currentpage, totalPages: totalPages });
          })
          .catch((dbreject2) => {
            console.log(dbreject2);
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
