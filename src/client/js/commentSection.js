import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById('commentForm');
const deleteSpan = document.querySelectorAll('.deleteComment');

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    
    const deleteSpan = document.createElement("span");
    deleteSpan.innerText = ` ❌`;
    deleteSpan.className = 'deleteComment'
    deleteSpan.addEventListener("click", handleDelete);
    
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteSpan);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => { 
    // to prevent the browser does(to submit form)
    event.preventDefault();
    const textarea = form.querySelector('textarea');
    const text = textarea.value 
    const videoID = videoContainer.dataset.id
    if(!text === "") {
        return
    }
    const response = await fetch(`/api/videos/${videoID}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text})
    })
    
    if(response.status === 201) {
        textarea.value = "";
        const {newCommentId} = await response.json()
        addComment(text, newCommentId)
    }
}

const handleDelete = async (event) => {
    const li = event.target.parentElement;
    const {
        dataset: { id: commentId },
      } = li;
    li.remove()
    await fetch(`/api/comments/${commentId}/deleteComment`, {
        method: 'DELETE',
    })

}

if(form) {
    form.addEventListener('submit', handleSubmit);
}

if(deleteSpan) {
    deleteSpan.forEach((element) => element.addEventListener('click', handleDelete)) 
}
