import {
  handleCreateTemplate,
  handleGetTemplateById,
  handleNewTemplate,
  handleUpdateTemplate,
} from "./controllers/templates";
import {
  handleDeleteUser,
  handleLoginUser,
  handleUserUploadImage,
} from "./controllers/users";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ErrorResponse, SuccessResponse } from "./utils/statusmessage";
import {
  handleDashboardUploadVideo,
  handleDashboardVideoDelete,
  handleDeleteVideoFromBucketAndDatabase,
  handleGetListVideos,
  handleListVideo,
  handleUploadVideo,
} from "./controllers/videos";
import multer from "multer";
import {
  handleDashboardImageDelete,
  handleDashboardImageUploadFile,
  handleDeleteImage,
  handleDeleteImageFromBucket,
  handleGetListImages,
  handleImageTableFieldsName,
  handleListImage,
  handleSearchVectors,
  handleUploadImage,
} from "./controllers/images";
import {
  handleDeleteAudio,
  handleListAudio,
  handleUploadAudio,
} from "./controllers/audios";
import {
  handleAddNewCategory,
  handleDeleteCategory,
  handleGetCategoryData,
  handleGetCategoryDataById,
  handleGetCategoryIdAndName,
  handleSupabaseGet,
  handleUpdateCategory,
} from "./controllers/categories";
import {
  handleAddNewTag,
  handleDeleteTag,
  handleGetTagIdAndName,
  handleListAllTags,
  handleUpdateTag,
} from "./controllers/tags";
import {
  handleAddNew2Vector,
  handleDeleteVector,
  handleAddNew3Vector,
  handleGetVectorsList,
  handleGetVectorsUrl,
} from "./controllers/vectors";
import { handleListAllCustomers } from "./controllers/customers";
import {
  handleDeleteAnimation,
  handleGetAnimationsList,
} from "./controllers/animations";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

//app.use(express.urlencoded(({extended:false})));

app.get("/", (req: any, res: any, _next: unknown) => {
  try {
    if (!req) return res.send(new ErrorResponse());
    res.send(new SuccessResponse());
  } catch (err: unknown) {
    return res.send(new ErrorResponse());
  }
});

app.delete("/delete_user", handleDeleteUser);
app.post("/create_template", handleCreateTemplate);
app.get("/get_template_by_id/:template_id", handleGetTemplateById);
app.delete("/delete_element/:template_id/:element_id", handleUpdateTemplate);
app.get("/list_videos", handleListVideo);
app.get("/list_images", handleListImage);
app.get("/images/images_fields", handleImageTableFieldsName);
app.get("/list_audios", handleListAudio);
app.post("/new_video", upload.single("newvideo"), handleUploadVideo);
app.post("/new_image", upload.single("newimage"), handleUploadImage);
app.post("/new_audio", upload.single("newaudio"), handleUploadAudio);

app.post("/template/new_template", handleNewTemplate);

//API of Delete Image from Bucket and Database both
app.delete("/image/delete/:imageid", handleDeleteImageFromBucket);
//End of this code

//API of Delete Video from Bucket and Datbase both
app.delete("/video/delete/:videoid", handleDeleteVideoFromBucketAndDatabase);
//End of this code

app.delete("/delete_audio/:audioid", handleDeleteAudio);
app.post("/login", handleLoginUser);
app.get(`/images/search_vectors/:vector_name`, handleSearchVectors);

// User Controllers API

app.post(`/user/user_upload_image`, handleUserUploadImage);

//User Login API

app.post(`/user/login`, handleLoginUser);

//End

app.get("/template/:templateid", async (req: any, res: any, next: any) => {
  if (!req) return new ErrorResponse(404, "No Request Found");
  try {
    res.redirect("http://localhost:3000/editor");
  } catch (err) {
    console.log(err);
  }
});

//Categories API
app.post("/categories/new", handleAddNewCategory);

app.get("/categories/list_categories", handleGetCategoryData);

app.delete("/categories/delete/:deleteId", handleDeleteCategory);

app.put("/categories/update", handleUpdateCategory);

app.get("/categories/get/:categoryId", handleGetCategoryDataById);

app.get("/categories/listidname", handleGetCategoryIdAndName);

app.get("/categories/listall", handleSupabaseGet);

//End

//Tags API

app.post("/tags/new", handleAddNewTag);

app.get("/tags/list_tags", handleListAllTags);

app.delete("/tags/delete/:deleteId", handleDeleteTag);

app.put("/tags/update", handleUpdateTag);

app.get("/tags/listidname", handleGetTagIdAndName);

//End of Tags API

//Vectors API
app.get("/vectors/listall", handleGetVectorsList);

app.get("/vectors/list_vectors_url", handleGetVectorsUrl);

app.post("/vectors/new2", upload.single("vectorfile"), handleAddNew2Vector);

app.post("/vectors/new3", upload.single("vectorfile"), handleAddNew3Vector);

app.delete("/vectors/delete/:deleteId", handleDeleteVector);

//End of Vectors API

//Customers API starts here

app.get("/customers/listall", handleListAllCustomers);

//End of customers API

//Images API

app.get("/images/listall", handleGetListImages);

app.post(
  "/images/singleimagefile",
  upload.single("imagefile"),
  handleDashboardImageUploadFile
);

app.delete("/images/delete/:deleteId", handleDashboardImageDelete);

//End

//Videos API
app.get("/videos/listall", handleGetListVideos);

app.post(
  `/videos/singlevideofile`,
  upload.single("videofile"),
  handleDashboardUploadVideo
);

app.delete("/videos/delete/:deleteId", handleDashboardVideoDelete);

//End

//Animation APi
app.get("/animations/listall", handleGetAnimationsList);

app.delete("/animations/delete/:deleteId", handleDeleteAnimation);

//End
