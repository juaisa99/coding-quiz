var username = document.getElementById('username');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

var maxHighScore = 5;


finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    console.log('clicked the save button!');
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);

    highScores.sort( (a,b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('./index.html')

    
};
