var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        choice5: 'I dont know?',
        answer: 3
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        choice1: 'parentheses',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'square brackets',
        choice5: 'I dont know?',
        answer: 1
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        choice5: 'I dont know?',
        answer: 4
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parentheses',
        choice5: 'I dont know?',
        answer: 3
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal / bash',
        choice3: 'for loops',
        choice4: 'console.log',
        choice5: 'I dont know?',
        answer: 4
    },
];

var correctBonus = 20;
var maxQuestion = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestion) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + '/' + maxQuestion;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';

                if(classToApply === 'correct') {
                    incrementScore(correctBonus);
                }
            };
            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout( ( ) => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
    });
});
// Score incremention
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();