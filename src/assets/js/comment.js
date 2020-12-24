import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentForm = document.querySelectorAll(".jsDeleteForm");
const replyText = document.querySelectorAll("#replyText");
const addCommentReplyForm = document.querySelectorAll("#jsAddReplyComment");
const replyDeleteCommentForm = document.querySelectorAll(".jsReplyDeleteForm");

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




function getNthParent(elem, n) {
    return n === 0 ? elem : getNthParent(elem.parentNode, n - 1);
}

const deleteReplyComment= (event)=> {
    event.preventDefault();
    const column = getNthParent(event.target,2);
    const ul = getNthParent(event.target,3);
    ul.removeChild(column); 
}

const handleReplyDeleteComment = async (event)=>{
    event.preventDefault();
    const videoId = window.location.href.split("/videos/")[1];
    const form  = event.target;
    const input = form.querySelector("input");
    const id = input.name;
    const ul = getNthParent(event.target,3);
    let commentId = ul.id;
    commentId= commentId.slice(2,);
    const response = await axios({
        url: `/api/${videoId}/${commentId}/recomment/delete`,
        method:"POST",
        data:{id}
    })
    if(response.status===200){
        deleteReplyComment(event)
    }
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
    const replyCreator = document.createElement("span");
    replyCreator.className="replyCreator";
    replyCreator.innerHTML="recent";
    const ul= document.getElementById(`00${commentId}`)
    const replyli = document.createElement("li");
    replyli.className="replycomment__area";
    const replytextarea = document.createElement("div");
    const replytext = document.createElement("span");
    replytextarea.className="replyText";
    replytext.innerHTML=comment;

    replytext.classList.add="block";
    replytextarea.appendChild(replyCreator);

    replytextarea.appendChild(replytext);
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
    sendReplyComment(comment, commentId);
    commentInput.value="";
}
Array.from(addCommentReplyForm).forEach(addCommentReply => {
    addCommentReply.addEventListener('submit',handleSubmitReplyComment);
});


const handleReplyClick = (event)=>{
    event.preventDefault();
    const replyAreaTarget = event.target
    console.log(replyAreaTarget);
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
    replyDeleteCommentForm.forEach((item)=>{
        item.addEventListener("submit",handleReplyDeleteComment)
    });
}

if (addCommentForm){
    init();
}