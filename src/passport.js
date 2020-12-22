import passport from "passport";
import GithubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import GoogleStrategy from "passport-google-oauth20";

import { facebookLoginCallback, githubLoginCallback,googleLoginCallback,kakaoLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";


passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
    done(null, user);
    });

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user);
    });
    });

passport.use(new FacebookStrategy({
    clientID:process.env.FD_ID,
    clientSecret: process.env.FD_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://peaceful-citadel-70088.herokuapp.com/${routes.facebookCallback}`
    : `http://localhost:4000${routes.facebookCallback}`,
    profileFields: ["id", "displayName", "photos", "email"],
    scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
)
passport.use(new KakaoStrategy({
    clientID:process.env.KT_ID,
    clientSecret:process.env.KT_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://peaceful-citadel-70088.herokuapp.com/${routes.kakaoCallback}`
    : `http://localhost:4000${routes.kakaoCallback}`}
    , kakaoLoginCallback
    ))

passport.use(new GithubStrategy({
    clientID:process.env.GIT_ID,
    clientSecret: process.env.GIT_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://peaceful-citadel-70088.herokuapp.com/${routes.githubCallback}`
    : `http://localhost:4000${routes.githubCallback}`}
    , githubLoginCallback
    ));

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://peaceful-citadel-70088.herokuapp.com/${routes.googleCallback}`
    : `http://localhost:4000${routes.googleCallback}`}
    , googleLoginCallback
    ));