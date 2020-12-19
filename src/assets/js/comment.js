import axios from "axios";



const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentForm = document.querySelectorAll(".jsDeleteForm");

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


function init(){
    addCommentForm.addEventListener("submit",handleSubmitComment);
    deleteCommentForm.forEach((item) => {
        item.addEventListener("submit", handleDeleteComment)
    });
}

if (addCommentForm){
    init();
}