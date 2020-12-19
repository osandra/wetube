import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const VideoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumnBtn = document.getElementById("jsVolumnButton");
const screenBtn = document.getElementById("jsScreenButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeControl = document.getElementById("jsVolume");

function handlePlayButton(){
    if(VideoPlayer.paused){
        VideoPlayer.play();
        playBtn.innerHTML=`<i class="fas fa-pause"></i>`
    } else{
        VideoPlayer.pause();
        playBtn.innerHTML=`<i class="fas fa-play"></i>`
    }
};


function handleVolumnButton(){
    if(VideoPlayer.muted){
        VideoPlayer.muted=false;
        volumnBtn.innerHTML=`<i class="fas fa-volume-up"></i>`;
        volumeControl.value=VideoPlayer.volume;
    } else{
        volumeControl.value=0;
        VideoPlayer.muted=true;
        volumnBtn.innerHTML=`<i class="fas fa-volume-mute"></i>`;
    }
};

const formatDate = seconds => {
    const secondsNum = parseInt(seconds,10);
    let hours = Math.floor(secondsNum / 3600);
    let minutes = Math.floor((secondsNum-hours*3600)/60);
    let totalSeconds = secondsNum - hours*3600 - minutes*60
    if(hours<10){
        hours = `0${hours}`;
    }
    if(minutes<10){
        minutes = `0${minutes}`;
    }
    if(totalSeconds<10){
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime(){
    currentTime.innerHTML = formatDate(Math.floor(VideoPlayer.currentTime));
}

async function setTotalTime(){
    const blob = await fetch(VideoPlayer.src).then(response=>response.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML=totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function exitFullSreen(){
    document.exitFullscreen();
    screenBtn.innerHTML=`<i class="fas fa-expand"></i>`;
    screenBtn.addEventListener("click",goFullScreen);
}

function goFullScreen(){
    screenBtn.innerHTML=`<i class="fas fa-compress"></i>`;
    screenBtn.removeEventListener("click",goFullScreen);
    videoContainer.requestFullscreen();
    screenBtn.addEventListener("click",exitFullSreen);
}
function handleDrag(event){
    const {
        target:{ value }
    } = event;
    VideoPlayer.volume = value;
    if(value>=0.6){
        volumnBtn.innerHTML=`<i class="fas fa-volume-up"></i>`;
    } else if (value>=0.2){
        volumnBtn.innerHTML=`<i class="fas fa-volume-down"></i>`;
    } else{
        volumnBtn.innerHTML=`<i class="fas fa-volume-off"></i>`;
    }
}
const registerView = ()=>{
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`,{method:"POST"});
}
const handleEnded=()=>{
    registerView();
    VideoPlayer.currentTime=0;
    playBtn.innerHTML=`<i class="fas fa-play"></i>`;
}

const videoButtonInit = ()=>{
    playBtn.innerHTML=`<i class="fas fa-pause"></i>`
}
function init(){
    VideoPlayer.volume=0.5;
    videoButtonInit();
    playBtn.addEventListener("click",handlePlayButton);
    volumnBtn.addEventListener("click",handleVolumnButton);
    screenBtn.addEventListener("click",goFullScreen);
    VideoPlayer.addEventListener("loadedmetadata",setTotalTime);
    VideoPlayer.addEventListener("ended", handleEnded);
    volumeControl.addEventListener("input",handleDrag);
};

if(videoContainer){
    init()
};

