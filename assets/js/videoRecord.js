const recordContainer = document.getElementById("jsRecordContainer")
const videoPreview = document.getElementById("jsVideoPreview")
const recordButton = document.getElementById("jsRecordBtn")

let streamObject;
let videoRecord;
const handleVideoData = event=>{
    const {data : videoFile } = event;
    const link = document.createElement("a");
    link.href =URL.createObjectURL(videoFile);
    link.download="recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const startRecording = () =>{
    videoRecord = new MediaRecorder(streamObject);
    videoRecord.start();
    videoRecord.addEventListener("dataavailable", handleVideoData);
    recordButton.addEventListener("click",stopRecording);
}

const getVideo = async()=>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject=stream;
        videoPreview.muted=true;
        videoPreview.play();
        recordButton.innerHTML=`Stop recording`
        streamObject = stream;
        startRecording();
    }
    catch(error){
        recordButton.innerHTML=`Can't record!`
    } finally{
        recordButton.removeEventListener("click",startRecording);
    }
}

const stopRecording = ()=>{
    videoRecord.stop();
    recordButton.removeEventListener("click",stopRecording);
    recordButton.addEventListener("click",getVideo);
    recordButton.innerHTML="Start recording";
}

function init(){
    recordButton.addEventListener("click",getVideo);
}
if(recordContainer){
    init();
}