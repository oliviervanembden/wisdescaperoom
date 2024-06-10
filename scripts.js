let timerShown = false;

function onYouTubeIframeAPIReady() {
    const player = new YT.Player('youtube-video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !timerShown) {
        setTimeout(showTimer, 54000); // 54,000 milliseconds = 54 seconds
    }
}

function showTimer() {
    document.getElementById('timer').classList.remove('hidden');
    timerShown = true;
}

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
