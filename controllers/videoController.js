import routes from "../routes";
import Video from "../models/Video"

export const home = async(req,res) => {
    try{
        const videos = await Video.find({})
        res.render("home",{pageTitle: "Home",videos});
    } 
    catch(error){
        console.log(error);
        res.render("home",{pageTitle: "Home",videos:[]});
    }
};
export const search = async (req, res)=> {
    //console.log(req.query);
    const {query: {term: searchingBy}} = req;
    const videos = await Video.find({title:{$regex:searchingBy,$options:"i"}});
    res.render("search",{pageTitle: "Search",searchingBy, videos})
    };
export const getUpload = (req, res)=> {
    res.render("upload",{pageTitle: "Upload"})
};
export const postUpload = async (req,res)=> {
    const {
        body:{title, description},
        file:{path}
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator:req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save()
    // console.log(routes.videoDetail(newVideo.id)); 
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
        body:{title,description}
    }=req;
    try {
        await Video.findOneAndUpdate({_id:id},{title,description});
        res.redirect(routes.videoDetail(id));
    }
    catch(error){
        console.log(error);
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
    // console.log(req.params);
    try{
        const video = await Video.findById(id).populate("creator");
        //console.log(video);
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