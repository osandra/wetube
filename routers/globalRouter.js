import express from "express";
import {home, search} from "../controllers/videoController";
import {getJoin, postJoin, getLogin, postLogin, logout} from "../controllers/userController";
import routes from "../routes";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate,logout);
globalRouter.get(routes.search,search);

export default globalRouter;