import express from "express";
import passport from "passport";
import {home, search} from "../controllers/videoController";
import {getJoin, postJoin, getLogin, postLogin, logout, githubLogin, postGithubLogin, getMeProfile,
    facebookLogin, postFacebookLogin, kakaoLogin, postKakaoLogin} from "../controllers/userController";
import routes from "../routes";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

//github login
globalRouter.get(routes.github,githubLogin);
globalRouter.get(routes.githubCallback,
    passport.authenticate("github",{failureRedirect:"/login"}),
    postGithubLogin
    )

//facebook login
globalRouter.get(routes.facebook,facebookLogin);
globalRouter.get(routes.facebookCallback,
    passport.authenticate("facebook",{failureRedirect:"/login"}),
    postFacebookLogin
    );

//kakao Login
globalRouter.get(routes.kakao,kakaoLogin);
globalRouter.get(routes.kakaoCallback,
    passport.authenticate("kakao",{failureRedirect:"/login"}),
    postKakaoLogin
    );

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate,logout);
globalRouter.get(routes.search,search);
globalRouter.get(routes.me,getMeProfile);

export default globalRouter;