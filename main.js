const cardsQty = 9;

let gameTask = [];
let gameSolve = [];
let currentLevel = 0;
const allGameLevels = [];
const inputSelectLevels = document.querySelector('input.inputSelectLevels');
const paragraphInputValue = document.querySelector('p.inputValue');
const gameTaskCards = document.querySelectorAll('.gameTask .card');
const gameSolveCards = document.querySelectorAll('.gameSolve .card');
const paragraphSelectedCard = document.querySelector('p.selectedCard');
const btnStart = document.querySelector('.btnStart');
const btnReset = document.querySelector('.btnReset');
const levelCounterTask = document.querySelector('.gameTask .levelCounter');
const levelCounterSolve = document.querySelector('.gameSolve .levelCounter');

const addEventListeners = () => {
	inputSelectLevels.addEventListener('change', () => {
		paragraphInputValue.textContent = inputSelectLevels.value;
	});
	btnStart.addEventListener('click', startGame);
	[...gameSolveCards].forEach(el =>
		el.addEventListener('click', saveUserChoisedCard)
	);
};

const startGame = () => {
	setDrownCards();
	setLevelCounter();
	paintCurrentCardAndLevel(currentLevel);
	currentLevel++;
};
const resetGame = () => {
	gameTask = [];
	gameSolve = [];
	currentLevel = 0;
};
// prepare to game
const drawOneCard = () => {
	const getRandomInt = max => {
		return Math.floor(Math.random() * max);
	};
	const drownCard = gameTaskCards[getRandomInt(cardsQty)];
	return drownCard;
};
const setDrownCards = () => {
	for (let i = 1; i <= inputSelectLevels.value; i++) {
		const newSelectedCard = drawOneCard();
		gameTask.push(newSelectedCard);
	}
};
const setLevelCounter = () => {
	for (let i = 1; i <= inputSelectLevels.value; i++) {
		allGameLevels.push(`<div class="level" id="level.${i}">${i}</div>`);
	}
	levelCounterTask.innerHTML = allGameLevels.join('');
	levelCounterSolve.innerHTML = allGameLevels.join('');
};

// game operation
const paintCurrentCardAndLevel = level => {
	const currentCardTask = gameTask[level];
	const currentLevelTask = levelCounterTask.children[level];
	currentCardTask.style.backgroundColor = 'green';
	currentLevelTask.style.backgroundColor = 'green';
	setTimeout(() => {
		currentCardTask.style.backgroundColor = 'transparent';
	}, 500);
};
const paintAFewLevels = level => {
	for (let i = 0; i <= level; i++) {
		setTimeout(() => {
			paintCurrentCardAndLevel(i);
		}, 1000);
	}
};
const saveUserChoisedCard = e => {
	gameSolve.push(e.target);
	checkSelectedCard();
};
const checkSelectedCard = () => {
	const i = currentLevel - 1;
	const shouldBeChoised = gameTask[i].id;
	const choised = gameSolve[i].id;
	if (shouldBeChoised === choised) {
		console.log('good choise');
		nextLevel();
	} else {
		console.log('bad choise');
	}
};
const nextLevel = () => {
	paintAFewLevels(currentLevel);
};

window.addEventListener('DOMContentLoaded', addEventListeners);
