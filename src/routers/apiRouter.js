import express from "express";
import routes from "../routes";
import {
    postAddComment,
    postRegisterView,
    postDeleteComment,
    postAddReplyComment,
    postReplyDeleteComment
} from "../controllers/videoController";
    
const apiRouter = express.Router();

apiRouter.post(routes.registerView,postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment(), postDeleteComment);
apiRouter.post(routes.recomment,postAddReplyComment);
apiRouter.post(routes.deleteRecomment,postReplyDeleteComment);

export default apiRouter;