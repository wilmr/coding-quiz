var highScore = document.querySelector('#highscores');
var clearScores = document.querySelector('#delete');
var goBack = document.querySelector('#goBack');
var savedScores = localStorage.getItem('savedScores');

savedScores = JSON.parse(savedScores);

// check for local storage
// create li dom elements and fill with content from local storage
if (savedScores !== null) {
	for (var i = 0; i < savedScores.length; i++) {
		var li = document.createElement('li');
		li.textContent = savedScores[i].initials + ' ' + savedScores[i].score;
		highScore.appendChild(li);
	}
}

// on button click, goes back to home page
goBack.addEventListener('click', () => {
	window.location.replace('./index.html');
});

// on button click, clears local storage
clearScores.addEventListener('click', () => {
	localStorage.clear();
	location.reload();
});
