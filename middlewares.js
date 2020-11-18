import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest:"uploads/videos/"});
export const localsMiddleware = (req,res,next)=>{
res.locals.siteName = "Wetube";
res.locals.routes = routes;
res.locals.loggedUser = req.user || null
console.log(req.user)
next();
}

export const uploadVideo = multerVideo.single("videoFile")

export const onlyPublic = (req,res,next) =>{
    if(req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req,res,next)=>{
    if(req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
};