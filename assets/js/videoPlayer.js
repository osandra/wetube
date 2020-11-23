const videoContainer = document.getElementById("jsVideoPlayer");
const VideoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayButton(){
    if(VideoPlayer.paused){
        VideoPlayer.play();
    } else{
        VideoPlayer.pause();
    }
}

function init(){
    playBtn.addEventListener("click",handlePlayButton);
};

if(videoContainer){
    init()
};

