let currentQuestion = 1;

const questions = {
    1: { question: "Vraag 1: Wat is 5 + 3?", answer: "8" },
    2: { question: "Vraag 2: Wat is de hoofdstad van Frankrijk?", answer: "Parijs" },
    // Voeg meer vragen toe zoals nodig
};

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const feedback = document.getElementById('feedback');

    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
        feedback.textContent = "Juist antwoord!";
        currentQuestion++;
        if (questions[currentQuestion]) {
            document.getElementById('question').textContent = questions[currentQuestion].question;
            document.getElementById('answer').value = '';
            feedback.textContent = '';
        } else {
            document.getElementById('question-section').innerHTML = "<h2>Gefeliciteerd, u heeft alle vragen beantwoord!</h2>";
        }
    } else {
        feedback.textContent = "Onjuist antwoord, probeer het opnieuw.";
    }
}
