import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentForm = document.querySelectorAll(".jsDeleteForm");
const replyText = document.querySelectorAll("#replyText");
const addCommentReplyForm = document.querySelectorAll("#jsAddReplyComment");


const addCommentNumber = ()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10)+1
}
const addFakeComment = (comment)=>{
    const ul = commentList;
    const li = document.createElement("li");
    li.className="comment__area"
    const info = document.createElement("span");
    const text = document.createElement("span");
    text.innerHTML=comment;
    info.innerHTML= "recent";
    info.classList.add("font-small");
    const column1 = document.createElement("div");
    const infoComment = document.createElement("div");
    const infoText = document.createElement('div');
    const column2 = document.createElement("div");
    const form = document.createElement('form');
    const input = document.createElement('input');
    infoComment.className="comment__info";
    infoText.className="comment";
    form.classList.add('delete');
    form.classList.add('jsDeleteForm');
    input.className="delete_comment"
    input.type="submit"
    input.value="";
    input.name="";
    form.appendChild(input)
    infoComment.appendChild(info);
    infoText.appendChild(text);
    column1.appendChild(infoComment)
    column1.appendChild(infoText)
    column2.appendChild(form)
    li.appendChild(column1);
    li.appendChild(column2);
    ul.prepend(li);
    addCommentNumber()
}


const minusCommentNumber = ()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10)-1
}
const deleteComment= (event)=> {
    event.preventDefault();
    const form = event.target;
    const column = form.parentNode;
    const ul = column.parentNode;
    console.log(column)
    ul.removeChild(column); 
    minusCommentNumber();
}

const handleDeleteComment = async (event)=>{
    event.preventDefault();
    const videoId = window.location.href.split("/videos/")[1];
    const form  = event.target;
    const input = form.querySelector("input");
    const id = input.name
    await axios({
        url: `/api/${videoId}/comment/delete`,
        method:"POST",
        data:{id}
    });
    deleteComment(event);
}

const sendComment= async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method:"POST",
        data:{
            comment
        }
    })
    if(response.status===200){
        addFakeComment(comment);
    }
}
const handleSubmitComment = event =>{
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value="";
}


const addFakeReplyComment = (comment,commentId)=>{
    const ul= document.getElementById(`00${commentId}`)
    const replyli = document.createElement("li");
    replyli.className="replycomment__area";
    const replytextarea = document.createElement("div");
    const replytext = document.createElement("span");
    replytextarea.className="replyText";
    replytext.innerHTML=comment;
    replytextarea.appendChild(replytext)
    replyli.appendChild(replytextarea);
    console.log(replyli);
    console.log(ul);
    ul.prepend(replyli);
}

const sendReplyComment = async (comment,commentId)=>{
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/${commentId}/recomment`,
        method:"POST",
        data:{
            comment
        }
    })
    if(response.status===200){
        addFakeReplyComment(comment,commentId);
    }
}

const handleSubmitReplyComment= event =>{
    event.preventDefault();
    console.log(event);
    const commentInput = event.target.firstChild
    console.log(commentInput)
    const comment = commentInput.value;
    const commentId = commentInput.id
    // console.log(commentId);
    sendReplyComment(comment, commentId);
    commentInput.value="";
}
Array.from(addCommentReplyForm).forEach(addCommentReply => {
    addCommentReply.addEventListener('submit',handleSubmitReplyComment);
});


const handleReplyClick = (event)=>{
    event.preventDefault();
    const replyAreaTarget = event.target
    const form = replyAreaTarget.nextElementSibling
    const input = form.querySelector("input")
    if (input.classList.contains("none")){
        input.classList.remove("none")
    }else{
        input.classList.add("none")
    }
   
}
Array.from(replyText).forEach(area => {
    area.addEventListener('click',handleReplyClick);
});

function init(){
    addCommentForm.addEventListener("submit",handleSubmitComment);
    deleteCommentForm.forEach((item) => {
        item.addEventListener("submit", handleDeleteComment)
    });
}

if (addCommentForm){
    init();
}