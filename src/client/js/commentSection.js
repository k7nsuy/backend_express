const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById('commentForm');

const handleSubmit = (event) => { 
    // to prevent the browser does(to submit form)
    event.preventDefault();
    const textarea = form.querySelector('textarea');
    const text = textarea.value 
    const videoID = videoContainer.dataset.id
    fetch(`/api/videos/${videoID}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text})
    })
    textarea.value = ""
}

if(form) {
    form.addEventListener('submit', handleSubmit);
}