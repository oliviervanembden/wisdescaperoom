let timerShown = false;
let countdownTime = 3000; // 50 minutes in seconds
let hintAvailable = false; // Variabele om bij te houden of de hint beschikbaar is
let elapsedTime = 0; // Variabele om de verstreken tijd bij te houden

function onYouTubeIframeAPIReady() {
    const player = new YT.Player('youtube-video', {
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !timerShown) {
        setTimeout(showTimer, 54000); // 54,000 milliseconds = 54 seconds
    }
    if (event.data == YT.PlayerState.ENDED) {
        if (timerShown == false ){
            showTimer();
        }
        showQuestion();
    }
}

function showTimer() {
    document.getElementById('timer').classList.remove('hidden');
    timerShown = true;
    startCountdown();
}

function startCountdown() {
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;
        countdownTime--;
        elapsedTime++; // Verhoog de verstreken tijd bij elke seconde
        if (countdownTime < 0) {
            clearInterval(interval);
            timerElement.textContent = "Tijd is om!";
        }
    }, 1000);
}

function showQuestion() {
    document.getElementById('video-section').classList.add('hidden');
    document.getElementById('question-section').classList.remove('hidden');
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const feedback = document.getElementById('feedback');
    const question = questions[currentQuestion];

    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        feedback.textContent = "Juist antwoord!";
        currentQuestion++;
        if (questions[currentQuestion]) {
            document.getElementById('question').textContent = questions[currentQuestion].question;
            document.getElementById('answer').value = '';
            feedback.textContent = '';
            hintAvailable = false; // Reset de hint beschikbaarheid bij een juist antwoord
            elapsedTime = 0; // Reset de verstreken tijd bij een juist antwoord
            document.getElementById('hint-section').classList.add('hidden');
        } else {
            document.getElementById('question-section').innerHTML = "<h2>Gefeliciteerd, u heeft alle vragen beantwoord!</h2>";
        }
    } else {
        feedback.textContent = "Onjuist antwoord, probeer het opnieuw.";
        if (elapsedTime >= 1 && !hintAvailable) { // Controleer of er al 8 minuten zijn verstreken en de hint nog niet is gegeven 480
            displayHintButton();
        }
    }
}

function displayHintButton() {
    document.getElementById('hint-section').classList.remove('hidden');
    const hintButton = document.createElement('button');
    hintButton.textContent = 'Hint';
    hintButton.onclick = showHint;
    document.getElementById('hint-section').appendChild(hintButton);
    hintAvailable = true; // Markeer de hint als beschikbaar
}

function showHint() {
    document.getElementById('hint-section').classList.add('hidden');
    const question = questions[currentQuestion];
    alert("Hint: " + question.hint); // Toon de hint in een alert (kan worden aangepast om op een andere manier weer te geven)
}

const questions = {
    1: { question: "Vraag 1: Wat is 5 + 3?", answer: "8" },
    2: { question: "Locatie vinden: 8x - 186.372 = y en 16 - √x + 225.666 = y", answer: "161", hint: "Het snijpunt is een cordinaat." },
    // Voeg meer vragen toe zoals nodig
};

let currentQuestion = 1;

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
