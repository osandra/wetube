import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    avataUrl:String,
    facebookId: Number,
    githubId: Number,
    kakaoId:Number,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],
    videos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose,{usernameField:'email'});

const model = mongoose.model("User",UserSchema);
export default model;