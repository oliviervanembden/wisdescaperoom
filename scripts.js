let timerShown = false;
let countdownTime = 3000; // 50 minutes in seconds
let hintAvailable = false; // Variabele om bij te houden of de hint beschikbaar is
let elapsedTime = 0; // Variabele om de verstreken tijd bij te houden
let hintCount = 0
let showHintButton = false;
let countdownInterval;
let timeBoost = 180;
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
    const endTime = Date.now() + countdownTime * 1000;
    
    countdownInterval = setInterval(() => {
        const remainingTime = Math.max(0, endTime - Date.now());
        countdownTime = Math.floor(remainingTime / 1000);
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;
        elapsedTime++; // Verhoog de verstreken tijd bij elke seconde
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
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

    if (userAnswer.toLowerCase().replace(/\s/g, '') === question.answer.toLowerCase()) {
        elapsedTime += timeBoost;
        timeBoost = 180;
        feedback.textContent = "Juist antwoord!";
        document.getElementById('hints').innerHTML = '';
        currentQuestion++;
        hintCount = 0;
        showHintButton = false;
        if (questions[currentQuestion]) {
            if(currentQuestion== 4 ){
                document.getElementById('matrixen').classList.remove('hidden')

            } else{


                document.getElementById('matrixen').classList.add('hidden')
            }
            document.getElementById('question').textContent = questions[currentQuestion].question;
            document.getElementById('answer').value = '';
            feedback.textContent = '';
            hintAvailable = false; // Reset de hint beschikbaarheid bij een juist antwoord // Reset de verstreken tijd bij een juist antwoord
            document.getElementById('hint-section').classList.add('hidden');
        } else {
            document.getElementById('question-section').innerHTML = "<h2>Gefeliciteerd, u heeft alle vragen beantwoord!</h2>";
            clearInterval(countdownInterval); // Stop de timer
            showSuccessVideo(); // Toon de succesvideo
        }
    } else {

        
        if (elapsedTime >= questions[currentQuestion].hintTime[hintCount]) { 
            feedback.textContent = "Onjuist antwoord, probeer het met een hint.";
            displayHintButton();
        } else if(questions[currentQuestion].hintTime[hintCount]< 10000 ){
            feedback.textContent = "Onjuist antwoord, een hint is beschikbaar over " +(questions[currentQuestion].hintTime[hintCount]-elapsedTime) + " secoden. Geef het niet op!" ;
        } else{
            feedback.textContent = "Onjuist antwoord, de hints zijn op ga door op je eigen kracht." ;
        }
    }
}

function displayHintButton() {
    if (showHintButton == false){
        document.getElementById('hint-section').classList.remove('hidden');
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Hint';
        hintButton.setAttribute('id','hintButton');
        hintButton.onclick = showHint;
        document.getElementById('hint-section').appendChild(hintButton);
        showHintButton = true;

    }

}

function showHint() {
    timeBoost = 0;
    if (questions[currentQuestion].hint[hintCount]=== false){

        var elem = document.createElement("img");
        elem.setAttribute("src", "dataimg.jpg");
        elem.setAttribute("alt", "Flower");
        document.getElementById("hints").appendChild(elem);

    }
    else{
        var pElement = document.createElement('p');
        pElement.textContent = questions[currentQuestion].hint[hintCount];
        document.getElementById('hints').appendChild(pElement)

    }
    document.getElementById('hintButton').remove();
    showHintButton = false;
    hintCount++;

}

const questions = {
    1: { question: "Volgens een gevangen genomen Noord Koreaanse hacker is de code: i-W+i-s", answer: "8", hint: ["Dr. A. Scii weet het antwoord."],hintTime: [300,999999999] },
    2: { question: "Vind de locatie 8x - 186.372 = y en 16 * - √x + 225.666 = y", answer: "161", hint: ["Het snijpunt is een coordinaat.", "het antwoord is een getal"],hintTime: [480,1080,999999999] },
    3: { question: "113", answer: "-10500", hint: ["Het is een lokaal","Zoek goed","x=m"], hintTime: [1260,1560,1740,99999999] },
    4: { question: "We weten via een informant van onze organisatie dat een deel van de code op de computer van M. Vermeulen staat. Om in de computer te komen en dit deel van de code te bemachtigen moeten jullie deze zien te ontcijferen. Het zit versleuteld achter een vernuftigd systeem van matrices. Matrix A & B zijn beide 3x3 matrices. Vermenigvuldig matrix a met matrix b en bereken vervolgens van de ontstaande matrix C de determinant.   ", answer: "3288", hint: ["binary", false],hintTime: [1860,2100,9999999999] },
    5: { question: "Eindvraag de code van de kluis is 8 de locatie is 161 voor de auto was de code -10500 en voor het kraken van de computer is 3288 ", answer: "-10500/(161-3288/8)=42", hint: ["vul de hele som",'Eindvraag de som is de zelfde berekening als de die in het koffertje( met andere cijfers)'],hintTime: [2400,2700,9999999]},
};

function showSuccessVideo() {
    document.getElementById('question-section').innerHTML = `
        <div class="video-container">
            <iframe id="youtube-success-video" width="560" height="315" src="https://www.youtube.com/embed/965BNWqVF-w?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
}

let currentQuestion = 1;

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
