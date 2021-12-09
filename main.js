const cardsQty = 16;
const inputSelectLevels = document.querySelector('input.inputSelectLevels');
const paragraphInputValue = document.querySelector('p.inputValue');
const gameTaskCards = document.querySelectorAll('.gameTask .card');
const gameSolveCards = document.querySelectorAll('.gameSolve .card');
const paragraphGameStatus = document.querySelector('p.gameStatus');
const btnStart = document.querySelector('.btnStart');
const btnReset = document.querySelector('.btnReset');
const levelCounterTask = document.querySelector('.gameTask .levelCounter');
const levelCounterSolve = document.querySelector('.gameSolve .levelCounter');
const heroShield = document.querySelector('.heroShield');
let gameTask = [];
let countOfSelectedCards = 0;
let currentLevel = 0;

const addEventListeners = () => {
	inputSelectLevels.addEventListener('change', () => {
		paragraphInputValue.textContent = inputSelectLevels.value;
	});
	btnStart.addEventListener('click', startGame);
	btnReset.addEventListener('click', resetGame);
	[...gameSolveCards].forEach(el =>
		el.addEventListener('click', handleOnClickCard)
	);
};
const prepareDataToGame = () => {
	setDrownCards();
	setLevelCounter('start');
};
const startGame = () => {
	prepareDataToGame();
	markAFewLevels(currentLevel);
	btnChangeDisplay('reset', 'flex');
	btnChangeDisplay('start', 'none');
	setParagraphGameStatus('start');
};
const resetGame = () => {
	gameTask = [];
	currentLevel = 0;
	countOfSelectedCards = 0;
	setLevelCounter('');
	btnChangeDisplay('start', 'flex');
	btnChangeDisplay('reset', 'none');
	setParagraphGameStatus();
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
const prepareElementsToLevelCounter = () => {
	const allGameLevels = [];
	for (let i = 1; i <= inputSelectLevels.value; i++) {
		allGameLevels.push(`<div class="level" id="level.${i}">${i}</div>`);
	}
	const allGameLevelsElementAsText = allGameLevels.join('');
	return allGameLevelsElementAsText;
};
const setLevelCounter = elementsToFillLevelCounter => {
	if (elementsToFillLevelCounter !== '') {
		elementsToFillLevelCounter = prepareElementsToLevelCounter();
	}
	levelCounterTask.innerHTML = elementsToFillLevelCounter;
	levelCounterSolve.innerHTML = elementsToFillLevelCounter;
};
const btnChangeDisplay = (btn, operation) => {
	if (btn === 'start') {
		btnStart.style.display = `${operation}`;
	} else if (btn === 'reset') {
		btnReset.style.display = `${operation}`;
	}
};
// game operation
const handleOnClickCard = e => {
	if (verificationOfSelection(e.target)) {
		operationAfterGoodSelection(e.target);
	} else {
		gameOver(e.target);
	}
	markElementAsTransparent(e.target);
};
const verificationOfSelection = selectedCard => {
	const shouldBeSelected = gameTask[countOfSelectedCards];
	if (selectedCard.id === shouldBeSelected.id) {
		return true;
	} else {
		return false;
	}
};
const gameOver = selectedCard => {
	markAFewLevels(currentLevel - 1);
	markElementOnColor(selectedCard, 'red');
	setParagraphGameStatus('lose');
	markLastLevelCounterTaskAfterGame('red');
	markLastLevelCounterSolve(countOfSelectedCards, 'red');
};
const operationAfterGoodSelection = selectedCard => {
	markElementOnColor(selectedCard, 'green');
	markLastLevelCounterSolve(countOfSelectedCards, 'green');
	countOfSelectedCards++;
	if (isEndLevel()) {
		if (isEndGame()) {
			setParagraphGameStatus('winner');
			markLastLevelCounterTaskAfterGame('green');
		} else {
			nextLevel();
		}
	}
};
const isEndLevel = () => {
	if (countOfSelectedCards - 1 === currentLevel) {
		return true;
	} else {
		return false;
	}
};
const isEndGame = () => {
	if (gameTask.length - 1 === currentLevel) {
		return true;
	} else {
		return false;
	}
};
const nextLevel = () => {
	markLastLevelCounterTaskAfterGame('green');
	currentLevel++;
	countOfSelectedCards = 0;
	markAFewLevels(currentLevel);
};
// functions to mark elements
const markElementOnColor = (element, color) => {
	if (element) {
		element.style.backgroundColor = `${color}`;
	}
};
const markElementAsTransparent = element => {
	if (element) {
		setTimeout(() => {
			element.style.backgroundColor = 'transparent';
		}, 500);
	}
};
const markLastLevelCounterTaskAfterGame = color => {
	const lastCounterLevel = levelCounterTask.children[currentLevel];
	markElementOnColor(lastCounterLevel, color);
};
const markCurrentTaskCard = level => {
	const currentCardTask = gameTask[level];
	markElementOnColor(currentCardTask, 'green');
	markElementAsTransparent(currentCardTask);
};
const markCurrentTaskLevelCounter = level => {
	const currentLevelCounter = levelCounterTask.children[level];
	if (level === currentLevel) {
		markElementOnColor(currentLevelCounter, '#809c03');
	} else {
		markElementOnColor(currentLevelCounter, 'green');
	}
};
const markAFewLevels = async levelsToMark => {
	for (let i = 0; i <= levelsToMark; i++) {
		heroShieldDisplay('block');
		await delay(1000);
		markCurrentTaskCard(i);
		markCurrentTaskLevelCounter(i);
	}
	heroShieldDisplay('none');
};
const markLastLevelCounterSolve = (level, color) => {
	const currentLevelCounter = levelCounterSolve.children[level];
	markElementOnColor(currentLevelCounter, color);
	markElementAsTransparent(currentLevelCounter);
};
const heroShieldDisplay = onOff => {
	heroShield.style.display = onOff;
};
const setParagraphGameStatus = status => {
	switch (status) {
		case 'start':
			paragraphGameStatus.textContent = 'Your taks: Repeat green sequences.';
			break;
		case 'winner':
			paragraphGameStatus.textContent = 'You are Winner!';
			break;
		case 'lose':
			paragraphGameStatus.textContent = 'You lose!';
			break;
		default:
			paragraphGameStatus.textContent = '';
			break;
	}
};
// helping functions
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
window.addEventListener('DOMContentLoaded', addEventListeners);
