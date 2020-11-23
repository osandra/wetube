const videoContainer = document.getElementById("jsVideoPlayer");
const VideoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumnBtn = document.getElementById("jsVolumnButton");
function handlePlayButton(){
    if(VideoPlayer.paused){
        VideoPlayer.play();
        playBtn.innerHTML=`<i class="fas fa-pause"></i>`
    } else{
        VideoPlayer.pause();
        playBtn.innerHTML=`<i class="fas fa-play"></i>`
    }
}

function handleVolumnButton(){
    if(VideoPlayer.muted){
        VideoPlayer.muted=false;
        volumnBtn.innerHTML=`<i class="fas fa-volume-up"></i>`
    } else{
        VideoPlayer.muted=true;
        volumnBtn.innerHTML=`<i class="fas fa-volume-mute"></i>`
    }
}
function init(){
    playBtn.addEventListener("click",handlePlayButton);
    volumnBtn.addEventListener("click",handleVolumnButton)
};

if(videoContainer){
    init()
};

