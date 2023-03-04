import { loadCards, saveCards, Result } from "./utility.js";

const resetCard = (card, cards) => {
	console.log("In resetCard");
	const app = document.getElementById("app");
	if (!app) {
		console.log("No app found - returning");
		return;
	}
	setButtonVisibility(false);
	const sideDisplay = document.getElementById("side");
	if (!sideDisplay) {
		console.log("No sideDisplay found - returning");
		return;
	}
	sideDisplay.innerHTML = `<p>${card.front}</p>`;
	sideDisplay.onclick = () => {
		setButtonVisibility(true);
		sideDisplay.innerHTML = `<p>${card.back}</p>`;
		document.getElementById("no-button").onclick = () => {
			console.log("No button onclick");
			const result = new Result(false);
			console.log("About to push", result);
			card.results.push(result);
			setCardReadyState(getNewCard(cards), cards);
			saveCards(cards);
		};
		document.getElementById("yes-button").onclick = () => {
			console.log("Yes button onclick");
			const result = new Result(true);
			console.log("About to push", result);
			card.results.push(result);
			setCardReadyState(getNewCard(cards), cards);
			saveCards(cards);
		};
	};
};

const setButtonVisibility = (visible) => {
	["yes-button", "no-button"].forEach((id) => {
		document.getElementById(id).classList = [
			visible ? "visible" : "invisible",
		];
	});
};

const setCardReadyState = (card, cards) => {
	setButtonVisibility(false);
	document.getElementById("side").innerHTML = `<p>Ready?</p>`;
	document.getElementById("side").onclick = () => resetCard(card, cards);
};

const getNewCard = (cards) => {
	let lowestCard;
	let currentLowestValue = 1; //set this high so it gets overwritten
	cards.forEach((card) => {
		const prob = card.getSample();
		if (prob < currentLowestValue) {
			currentLowestValue = prob;
			lowestCard = card;
		}
	});
	return lowestCard;
};

window.onload = () => {
	console.log("In index onload");
	const cards = loadCards();
	setCardReadyState(getNewCard(cards), cards);
};
