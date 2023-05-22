import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById('commentForm');

const addComment = (text) => {
    const videoComment = document.querySelector('.video__comments ul');
    const newComment = document.createElement('li');
    newComment.className = 'comment';
    const icon = document.createElement('i');
    icon.className = 'fas fa-comment';
    const span = document.createElement('span');
    span.innerText = `  ${text}`
    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComment.prepend(newComment);
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
    const {status} = await fetch(`/api/videos/${videoID}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text})
    })
    textarea.value = "";
    if(status === 201) {
            addComment(text)
        }
}

if(form) {
    form.addEventListener('submit', handleSubmit);
}