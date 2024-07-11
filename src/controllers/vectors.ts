import { prisma } from "../prismaClient";
import { deleteVectorFileFromBucket, uploadFile } from "../utils/s3";
import { z } from "zod";

// export async function handleAddNewVector(req: any, res: any, next: any) {
//   try {
//     if (!req) return res.status(404).send("Request Not Found");
//     const vectorfile = req.file;
//     const vectortype = vectorfile.mimetype;
//     const format = vectorfile.mimetype.split("/");
//     const vectorbuffer = vectorfile.buffer;
//     const category_id = req.body.category_id;
//     const tag_id = req.body.tag_id;
//     const name = req.body.name;
//     const description = req.body.description;
//     await prisma.vectors
//       .create({
//         data: {
//           name: name,
//           description: description,
//           likes: 0,
//           shares: 0,
//           format: format[1],
//         },
//       })
//       .then(async (dbresolve) => {
//         const vector_id = dbresolve.id;
//         /////////Replace with stored procedure or trigger
//         await prisma.vectors_Category.create({
//           data: {
//             vector_id,
//             category_id,
//           },
//         });
//         await prisma.vectors_Tag.create({
//           data: {
//             vector_id,
//             tag_id,
//           },
//         });
//         //////////////////////////////////////////////////
//         await uploadFile(vectorbuffer, `vectors/${dbresolve.id}`, vectortype)
//           .then((s3resolve) => {
//             console.log("From S3 Resolve", s3resolve);
//             if (s3resolve[`$metadata`]["httpStatusCode"] === 200)
//               res.status(201).send("Created");
//             /////Write the code for Rollback  of above tables
//             //res.status(202).send("Accepted");
//           })
//           .catch((s3reject) => {
//             console.log("From S3 Reject", s3reject);
//             res.status(400).send("Request Not Completed");
//           });
//       })
//       .catch((dbreject) => {
//         console.log(dbreject);
//         res.status(400).send("Request Not Completed");
//       });
//   } catch (error) {
//     console.log(error);
//     throw new Error("Exception is raised");
//   }
// }

export async function handleGetVectorsList(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    await prisma.vectors
      .findMany({})
      .then((dbresolve) => {
        console.log("Resolve", dbresolve);
        res.status(200).send(dbresolve);
      })
      .catch((dbreject) => {
        console.log("Reject", dbreject);
        res.status(400).send(dbreject);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function handleDeleteVector(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");
    const deleteId = req.params.deleteId;
    await deleteVectorFileFromBucket(deleteId)
      .then(async (s3resolve) => {
        if (!s3resolve || s3resolve["$metadata"]["httpStatusCode"] != 204)
          return res.status(405).send("Vector deletion request not completed");
        await prisma.vectors
          .delete({
            where: {
              id: deleteId,
            },
          })
          .then((dbresolve) => {
            console.log(dbresolve);
            res.status(200).send("OK");
          })
          .catch((dbreject) => {
            console.log(dbreject);
            res.status(405).send("Vector deletion request not completed");
          });
      })
      .catch((s3reject) => {
        console.log(s3reject);
        res.status(405).send("Vector deletion request not completed");
      });
  } catch (error) {
    console.log(error);
    res.status(405).send("Vector deletion request not completed");
  }
}

export async function handleAddNew2Vector(req: any, res: any, next: any) {
  try {
    if (!req) return res.status(404).send("Request Not Found");

    const name = req.body.name;
    const description = req.body.description;
    const categories = req.body.category_id;
    const tags = req.body.tag_id;
    const vectorfile = req.file;
    const vectortype = vectorfile.mimetype;
    const format = vectorfile.mimetype.split("/")[1];
    const vectorbuffer = vectorfile.buffer;
    await prisma.vectors
      .create({
        data: {
          name: name,
          description: description,
          categories: categories,
          tags: tags,
          likes: 0,
          shares: 0,
          format: format,
        },
      })
      .then(async(dbresolve) => {
        console.log(dbresolve);
          await uploadFile(vectorbuffer, `vectors/${dbresolve.id}`, vectortype)
          .then((s3resolve) => {
            console.log("From S3 Resolve", s3resolve);
            if (s3resolve[`$metadata`]["httpStatusCode"] === 200)
              res.status(201).send("Created");
          })
          .catch((s3reject) => {
            console.log("From S3 Reject", s3reject);
            res.status(400).send("Request Not Completed");
          });
      })
      .catch((dbreject) => {
        console.log(dbreject);
        res.status(400).send("Request Not Completed");
      });
  } catch (error) {
    console.log(error);
  }
}

export async function handleEditVectorData(req: any, res: any, next: any) {
  try {
  } catch (error) {}
}
