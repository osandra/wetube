//global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT= "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const EDIT_PROFILE="/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//Api
const API = "/api";
const REGISTER_VIEW = "/:id/view";
//comment
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment/delete";

//Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//Facebook
const FD="/auth/facebook";
const FD_CALLBACK="/auth/facebook/callback";

//KakaoTalk
const KT = "/auth/kakao";
const KT_CALLBACK = "/auth/kakao/callback";

const routes = {
 home: HOME,
 join: JOIN,
 login:LOGIN,
 logout:LOGOUT,
 search: SEARCH,
 users: USERS,
 userDetail: id =>{
     if(id){
        return `/users/${id}`
     } else{
        return USER_DETAIL;
     }
 },
 editProfile:EDIT_PROFILE,
 changePassword: CHANGE_PASSWORD,
 videos: VIDEOS,
 upload: UPLOAD,

 videoDetail: id => {
   if (id) {
     return `/videos/${id}`;
   } else {
     return VIDEO_DETAIL;
   }
 },
 editVideo: id =>{
   if(id){
     return `/videos/${id}/edit`;
   } else {
     return EDIT_VIDEO;
   }
 },
 deleteVideo: id=>{
   if(id){
     return `/videos/${id}/delete`;
   } else{
     return DELETE_VIDEO;
   }
 },
 github:GITHUB,
 githubCallback: GITHUB_CALLBACK,
 me:ME,
 facebook:FD,
 facebookCallback:FD_CALLBACK,
 kakao:KT,
 kakaoCallback:KT_CALLBACK,
 api:API,
 registerView:REGISTER_VIEW,
 addComment:ADD_COMMENT,
 deleteComment: id=>{
   if(id) {
     return `/api/${id}/comment/delete`
   } else{
     return DELETE_COMMENT
   }
 },
}

export default routes;