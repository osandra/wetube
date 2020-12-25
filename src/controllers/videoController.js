import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

import ReplyComment from "../models/ReplyComment";

const alert = require('alert');  

export const home = async(req,res) => {
    try{
        const videos = await Video.find({}).populate("creator").sort( { views: -1 } );
        res.render("home",{pageTitle: "Home",videos});
    } 
    catch(error){
        console.log(error);
        res.render("home",{pageTitle: "Home",videos:[]});
    }
};

export const search = async (req, res)=> {
    const {query: {term: searchingBy}} = req;
    const videos = await Video.find(
        {$or:[
            {"title":{$regex:searchingBy,$options:"i"}},
            {"place":{$regex:searchingBy,$options:"i"}}
        ]}
    ).populate("creator")
    res.render("search",{pageTitle: "Search",searchingBy, videos})
    };
export const getUpload = (req, res)=> {
    res.render("upload",{pageTitle: "Upload"})
};

export const postUpload = async (req,res)=> {
    const {
        body:{title, description, place},
        file:{location} 
    } = req;
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        place,
        creator:req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save()
    res.redirect(routes.videoDetail(newVideo.id));
};

export const getEditVideo = async (req, res)=> {
    const {
            params:{id}
        }=req;
    try {
        const video = await Video.findById(id)
        if( `${video.creator}` !== `${req.user.id}`){
            throw Error();
        } else{
            res.render("editVideo",{pageTitle: `Edit ${video.title}`,video})
        }
    } catch(error){
        console.log(error);
        res.redirect(routes.home)
    }
};


export const postEditVideo = async (req, res)=> {
    const { 
        params:{id},
        body:{title,description, place}
    }=req;
    try {
        await Video.findOneAndUpdate({_id:id},{title,description,place});
        res.redirect(routes.videoDetail(id));
    }
    catch(error){
        res.redirect(routes.home);
    }
};

export const deleteVideo = async(req, res)=> {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        if(`${video.creator}` !== `${req.user.id}`){
            throw Error();
        } 
        else {
            await Video.findOneAndDelete({_id:id});
        }
    }
    catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
};

export const videoDetail = async(req, res)=> {
    const {
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id)
                            .populate("creator")
                            .populate({
                                path: "comments",
                                populate: {
                                    path: "creator",
                                },
                              })
                             .populate({
                                path: "comments",
                                populate: 
                                    {path: "childrenComment",
                                    populate:"creator"},                     
                              })
        res.render("videoDetail",{pageTitle:video.title,video});
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
    
};
export const postRegisterView = async(req,res)=>{
    const {
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
};
export const postDeleteComment = async(req,res)=>{
    const {
        body:{id}
    } = req;
    try {
        await Comment.findByIdAndRemove(id);
    } catch(error){
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
}
export const postReplyDeleteComment = async(req,res)=>{
    const {
        body:{id}
    } = req;
    try{
        await ReplyComment.findByIdAndRemove(id);
    } catch{
        res.status(400);
    } finally {
        res.end();
    }
    console.log(req);
}

export const postAddReplyComment = async(req,res)=>{
    const {
        params:{id,comment_id:commetID},
        body:{comment:replayText},
        user
    } = req;
    if(req.user===undefined){
        alert('로그인이 필요합니다.')
    }
    else {
        try{
            const video = await Video.findById(id);
            const replayComment = await ReplyComment.create({
                text: replayText,
                creator:user.id,
            })
            const comment = await Comment.findById(commetID);
            comment.childrenComment.push(replayComment.id);
            comment.save();
            video.save();
        }
        catch(error){
            res.status(400);
        }
        finally{
            res.end();
        }
    }
}

export const postAddComment = async(req,res)=>{
    const {
        params:{id},
        body:{comment},
        user
    } = req;
    if(req.user===undefined){
        alert('로그인이 필요합니다.')
    }
    else {
        try{
            const video = await Video.findById(id);
            const newComment = await Comment.create({
                text:comment,
                creator:user.id,
                childrenComment:[]
            })
            video.comments.push(newComment.id);
            video.save();
        }
        catch(error){
            res.status(400);
        }
        finally{
            res.end();
        }
    }
}