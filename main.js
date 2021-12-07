const cardsQty = 9;

let gameTask = [];
let gameSolution = [];
const allGameLevels = [0, 1, 2, 3, 4, 5];
const gameTaskCards = Array.from(document.querySelectorAll('.gameTask .card'));
const gameSolutionCards = Array.from(
	document.querySelectorAll('.gameSolution .card')
);

const drawOneCard = () => {
	const getRandomInt = max => {
		return Math.floor(Math.random() * max);
	};
	const drownCard = gameTaskCards[getRandomInt(cardsQty)];
	return drownCard;
};
const saveDrownCard = () => {
	gameTask.push(drawOneCard());
};
const paintDrownCard = () => {
    gameTask[0].style.backgroundColor = "red";
}
console.log(saveDrownCard());
console.log(saveDrownCard());
console.log(saveDrownCard());
paintDrownCard();
console.log(gameTask);
