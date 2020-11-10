import express from "express";
import routes from "../routes";
import {
    search,
    getUpload,
    postUpload,
    videoDetail,
    getEditVideo,
    deleteVideo,
    postEditVideo
} from "../controllers/videoController";
import {uploadVideo} from "../middlewares";
const videoRouter = express.Router();
videoRouter.get(routes.search,search);

//Upload Video
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//Edit Video
videoRouter.get(routes.editVideo(),getEditVideo);
videoRouter.post(routes.editVideo(),postEditVideo)

videoRouter.get(routes.deleteVideo,deleteVideo);
videoRouter.get(routes.videoDetail(),videoDetail);

export default videoRouter;





