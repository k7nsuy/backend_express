const video =document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const time = document.getElementById('time');
const volumeRange = document.getElementById('volume');
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const timeLine = document.getElementById('timeLine');
const fullScreen = document.getElementById('fullScreen');
const videoContainer = document.getElementById('videoContainer');

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)

// default volume
let volumeValue = video.volume = 0.5

// Click event
const handlePlayClick = (e) => { 
    // if the video is playing, pause it
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    // 
}

// Mute event
const handleMute = (e) => {
    if(video.muted) { 
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
    volumeRange.value = video.muted ? 0 : volumeValue;
}

// Pause event
const handlePause = () => {
    playBtn.innerText = 'Play';
}

// Play event
const handlePlay = () => {
    playBtn.innerText = 'Pause';
}

// set volume from event.target.value
const handleVolume  = (event) => {
    const {target: {value}} = event;
    if(video.muted) {
        video.muted = false;
        muteBtn.innerTex = "Mute"
    } 
    volumeValue = value
    video.volumeValue = value
}

// Time event
const handleloadMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration))
    timeLine.max = Math.floor(video.duration)
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime))
    timeLine.value = Math.floor(video.currentTime)
    
}

const handleTimeLineChange = (event) => {
    const {
        target: {value}
    } = event
    video.currentTime = value
}

// full screen event
const handleFullScreen = () => {
    videoContainer.requestFullscreen()
}

// Event Listener
playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMute)
video.addEventListener('pause', handlePause)
video.addEventListener('play', handlePlay)
volumeRange.addEventListener('input', handleVolume)
video.addEventListener('loadedmetadata', handleloadMetaData)
video.addEventListener('timeupdate',handleTimeUpdate)  
timeLine.addEventListener('input', handleTimeLineChange)
fullScreen.addEventListener('click', handleFullScreen) 
