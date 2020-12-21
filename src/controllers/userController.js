import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req,res) => res.render("join",{pageTitle: "Join"});
export const postJoin = async (req,res,next) => {
    const {
        body:{name,email,password,password2}
    } = req;
    if(password !== password2){
        res.status(400);
        req.flash('error',"Passwod don't match");
        res.render("join",{pageTitle: "Join"});
    } else {
        try {
            //Create User
            const user = await User({
                name,
                email
            });
            //Register user
            await User.register(user,password);
            next();
        }
        catch(error){
            console.log(error);
            res.redirect(routes.home);
        }   
    }
};

export const getLogin = (req, res)=> res.render("login",{pageTitle: "Login"});
export const postLogin = passport.authenticate("local",{
    failureRedirect: routes.login,
    successRedirect: routes.home,
    failureFlash: "Can't login. Please check email or password",
});

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req,res) =>{
    res.redirect(routes.home)
};

export const githubLoginCallback = async (_, __, profile, cb)=>{
    const {
        _json: { id,avatar_url:avataUrl, name,email }
      } = profile;
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.githubId = id;
          user.save();
          return cb(null, user);
        }
        const newUser = await User.create({
          email,
          name,
          githubId: id,
          avataUrl
        });
        return cb(null, newUser);
      } catch (error) {
          console.log(error);
            return cb(error);
      }
};

export const facebookLogin = passport.authenticate("facebook");
export const facebookLoginCallback = async(_,__,profile,cb) => {
    const {
        _json: {id, name, email}
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
          user.facebookId = id;
          user.avataUrl=`https://graph.facebook.com/${id}/picture?type=large`;
          user.save();
          return cb(null, user);
        }
        const newUser = await User.create({
          email,
          name,
          facebookId: id,
          avataUrl:`https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    }
    catch(error){
        return cb(error)
    }
  };
export const postFacebookLogin = (req,res) =>{
    res.redirect(routes.home)
};
export const kakaoLogin = passport.authenticate("kakao",{
    failureFlash: "Can't log in",
    successFlash: "Welcome!"
})
export const kakaoLoginCallback = async (_,__,profile,done) => {
    const {
        _json:{id, 
            kakao_account: {email},
            properties:{nickname:username}},
    }=profile;
    try {
        const user = await User.findOne({email});
        if(user){
            user.kakaoId = id;
            user.save();
            return done(null,user);
        }
        const newUser = await User.create({
            name:username,
            kakaoId:id,
            email
        });
        return done(null,newUser)
    }
    catch(error){
        return done(error);
    }
};
export const postKakaoLogin = (req,res)=>{
    res.redirect(routes.home)
};
export const logout = (req,res) => {
    req.logout();
    res.redirect(routes.home);
};

export const users = (req, res) => res.render("users",{pageTitle: "Users"});
export const getEditProfile = (req, res) => 
res.render("editProfile",{pageTitle: "Edit Profile"});
export const postEditProfile = async(req,res)=>{
    // console.log(req);
    const{
        user: { _id: id },
        body:{name,email},
        file
    }= req;
    try{
    await User.findByIdAndUpdate(id,{name,email,
    avataUrl:file?file.location:req.user.avataUrl})
    req.flash("success","Profile updated!")
    res.redirect(routes.me);
    //console.log(User);
    } catch(error){
        req.flash("error","Can't update profile")
        console.log(`error is ${error}`)
        res.render("editProfile",{pageTitle: "Edit Profile"});
    }
}

export const getChangePassword = (req, res) => res.render("changePassword",{pageTitle: "Change Password"});
export const postChangePassword = async(req, res) => {
    const {
        body:{oldPassword, newPassword,newPassword1}
    } = req;
    try{
        if(newPassword!==newPassword1){
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);
    }
    catch(error){
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
}

export const userDetail = async(req, res) => {
    const {
        params:{id}
    } = req;
    try{
        const user = await User.findById(id)
                                .populate("videos");
        res.render("userDetail",{pageTitle: "User Detail", user})
        //console.log(user.videos)
    }
    catch(error){
        console.log(error);
        req.flash("error","User not found");
        res.redirect(routes.home)
    }
};
export const getMeProfile = async (req,res) =>{
    const userId=req.user.id
    try{
        const user = await User.findById(userId)
                                .populate("videos");
        res.render("userDetail",{pageTitle: "User Detail", user})
        //console.log(user.videos)
    }
    catch(error){
        console.log(error);
        res.redirect(routes.home)
    }
}