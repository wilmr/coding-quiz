var currentTime = document.querySelector('#currentTime');
var startTimer = document.querySelector('#timerStart');
var questionDiv = document.querySelector('#questions');
var wrapper = document.querySelector('#questionsWrapper');

var questionNum = 0;
var timeLeft = 76;
var currScore = 0;
var holdTime = 0;
var penalty = 10;

var listQuestions = document.createElement('ul');

// array for questions
var questions = [
	{
		question: 'Commonly used data types DO NOT include:',
		choices: ['strings', 'booleans', 'alerts', 'numbers'],
		answer: 'alerts',
	},
	{
		question:
			'The condition in an if / else statement is enclosed within ____.',
		choices: [
			'"quotes"',
			'{curly brackets}',
			'(parentheses)',
			'[square brackets]',
		],
		answer: '(parentheses)',
	},
	{
		question: 'Arrays in Javascript can be used to store ____.',
		choices: [
			'numbers and strings',
			'other arrays',
			'booleans',
			'all of the above',
		],
		answer: 'all of the above',
	},
	{
		question:
			'String values must be enclosed within ____ when being assigned to variables.',
		choices: [',commas,', '{curly brackets}', '"quotes"', '(parenthesis)'],
		answer: '"quotes"',
	},
	{
		question:
			'A very useful tool for used during development and debugging for printing content to the debugger is:',
		choices: ['Javascript', 'terminal / bash', 'for loops', 'console log'],
		answer: 'console log',
	},
];

//listens for quiz start button click and starts timer
startTimer.addEventListener('click', () => {
	if (holdTime === 0) {
		holdTime = setInterval(() => {
			timeLeft--;
			currentTime.textContent = `Time: ${timeLeft}`;
			if (timeLeft <= 0) {
				clearInterval(holdTime);
				completed();
				currentTime.textContent = 'Your Time is up!';
			}
		}, 1000);
	}
	displayQuestions(questionNum);
});

// displays questions to screen
const displayQuestions = (questionNum) => {
	// clear old data
	questionDiv.innerHTML = '';
	listQuestions.innerHTML = '';

	// iterate through questions array and fill dom elements
	for (var i = 0; i < questions.length; i++) {
		var userQuestion = questions[questionNum].question;
		var userChoices = questions[questionNum].choices;
		questionDiv.textContent = userQuestion;
	}
	userChoices.forEach((newItem) => {
		var listItem = document.createElement('li');
		listItem.textContent = newItem;
		questionDiv.appendChild(listQuestions);
		listQuestions.appendChild(listItem);
		listItem.addEventListener('click', compare);
	});
};

//check if user choice is correct answer

const compare = (event) => {
	var choice = event.target;
	if (choice.matches('li')) {
		var createDiv = document.createElement('div');
		createDiv.setAttribute('id', 'createDiv');
		if (choice.textContent === questions[questionNum].answer) {
			currScore++;
			createDiv.textContent = `Correct!`;
		} else {
			timeLeft = timeLeft - penalty;
			createDiv.textContent = `Wrong!`;
		}
	}
	questionNum++;

	if (questionNum >= questions.length) {
		completed();
		createDiv.textContent = `End of quiz! You got  ${currScore}/${questions.length} questions Correct!`;
	} else {
		displayQuestions(questionNum);
	}
	questionDiv.appendChild(createDiv);
};

// once quiz is over clear dom content and display end results
const completed = () => {
	questionDiv.innerHTML = '';
	currentTime.innerHTML = '';

	var createH1 = document.createElement('h1');
	createH1.textContent = 'All Done!';
	questionDiv.appendChild(createH1);

	var createP = document.createElement('p');
	questionDiv.appendChild(createP);

	// Calculates time remaining and replaces it with currScore

	if (timeLeft >= 0) {
		var timeRemaining = timeLeft;
		clearInterval(holdTime);
		createP.textContent = `Your final Score is: ${timeRemaining}`;
	}

	// label and input for highscore save
	var label = document.createElement('label');
	label.textContent = 'Enter your name: ';
	questionDiv.appendChild(label);

	var inputLine = document.createElement('input');
	inputLine.setAttribute('type', 'text');
	inputLine.textContent = '';
	questionDiv.appendChild(inputLine);

	var submitBtn = document.createElement(`button`);
	submitBtn.setAttribute('type', 'submit');
	submitBtn.textContent = 'save my score';
	questionDiv.appendChild(submitBtn);

	// listens for submit button click and saves score to local storage

	submitBtn.addEventListener('click', () => {
		var initials = inputLine.value;

		if (initials === null) {
			console.log('Please enter a valid value');
		} else {
			var finalScore = {
				score: timeRemaining,
				initials: initials,
			};
			var savedScores = localStorage.getItem('savedScores');
			if (savedScores === null) {
				savedScores = [];
			} else {
				savedScores = JSON.parse(savedScores);
			}
			savedScores.push(finalScore);
			var newCurrScore = JSON.stringify(savedScores);
			localStorage.setItem('savedScores', newCurrScore);
			window.location.replace('./highscores.html');
		}
	});
};
