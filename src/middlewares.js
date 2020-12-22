import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import path from "path";
import routes from "./routes";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey:process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2"
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube12/videos",
    key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null,Math.random().toString(36).substring(2, 12) + Date.now().toString() + extension);
        },
  })
});

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl:"public-read",
        bucket:"wetube12/avatar"
    })
})

//const multerAvatar = multer({dest:"uploads/avatars/"});
export const localsMiddleware = (req,res,next)=>{
res.locals.siteName = "Wetube";
res.locals.routes = routes;
res.locals.loggedUser = req.user || null
next();
}

export const uploadVideo = multerVideo.single("videoFile")
export const uploadAvatar = multerAvatar.single("avatar")
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