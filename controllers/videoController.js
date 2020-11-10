import routes from "../routes";
import Video from "../models/Video"
export const home = async(req,res) => {
    try{
        const videos = await Video.find({})
        res.render("home",{pageTitle: "Home",videos:videos});
    } 
    catch(error){
        console.log(error);
        res.render("home",{pageTitle: "Home",videos:[]});
    }
};
export const search = async (req, res)=> {
    console.log(req.query);
    const {query: {term: searchingBy}} = req;
    const videos = await Video.find({title:searchingBy});
    res.render("search",{pageTitle: "Search",searchingBy,videos:videos})
    };
// export const videos = (req, res)=> res.render("videos",{pageTitle: "Videos"});
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
        description
    });
    console.log(routes.videoDetail(newVideo.id)); // videos/5fa89db8eddd9560fc44dc90
    res.redirect(routes.videoDetail(newVideo.id)); /// videos/videos/5fa89db8eddd9560fc44dc90
    // res.redirect(routes.home);
};

export const getEditVideo = async (req, res)=> {
    const {
            params:{id}
        }=req;
    try {
        const video = await Video.findById(id)
        res.render("editVideo",{pageTitle: `Edit ${video.title}`,video})
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

export const deleteVideo = (req, res)=> res.render("deleteVideo",{pageTitle: "Delete Video"});

export const videoDetail = async(req, res)=> {
    const {
        params:{id}
    } = req;
    console.log(req.params);
    try{
        const video = await Video.findById(id);
        res.render("videoDetail",{pageTitle: "Video Detail",video});
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
};