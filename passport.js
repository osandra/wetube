import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook"
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy())
passport.use(new GithubStrategy({
    clientID: process.env.Git_ID,
    clientSecret: process.env.Git_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`,}
    , githubLoginCallback
    ));

passport.serializeUser(function(user, done) {
    done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });

passport.use(new FacebookStrategy({
    clientID:process.env.FD_ID,
    clientSecret: process.env.FD_SECRET,
    callbackURL:`https://828caec78ab4.ngrok.io${routes.facebookCallback}`,
    profileFields: ["id", "displayName", "photos", "email"],
    scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
)