import { loadCards } from "./utility.js";

const generateResults = (cards) => {
	console.log("in generateResults:", cards);
	const resultsComponent = document.getElementById("results");
	if (!resultsComponent) {
		console.log("No results component found - aborting");
		return;
	}
	const existingTable = document.getElementById("results-table");
	if (!existingTable) {
		console.log("No results table component found - aborting");
		return;
	}
	const tableBody = document.getElementsByTagName("tbody")[0];
	cards.forEach((card) => {
		const row = document.createElement("tr");
		const cardName = document.createElement("td");
		cardName.innerHTML = `${card.front} &rarr; ${card.back}`;
		const successes = document.createElement("td");
		successes.innerText = card.getSuccesses();
		const total = document.createElement("td");
		total.innerText = card.results.length;

		[cardName, successes, total].forEach((td) => row.appendChild(td));
		tableBody.appendChild(row);
	});
};

const generateChart = (chart, cards) => {
	console.log("in generateChart:", { chart, cards });
	if (!chart) {
		console.log("No chart - aborting update");
		return;
	}
	const basis = new Array(100).fill(0).map((_, index) => {
		return index / 100;
	});
	basis.push(1);
	let datasets = cards.map((card) => {
		const data = basis
			.map((x) => card.pdf(x))
			.map((x, _, all) => x / all.reduce((acc, val) => acc + val), 0)
			.map((prob, index) => ({ x: basis[index], y: prob }));

		return {
			label: card.slug,
			data,
		};
	});
	console.log({ datasets });

	chart.data = {
		labels: basis,
		datasets,
	};
	chart.update();
};

window.onload = () => {
	console.log("in results onload");
	const canvas = document.getElementById("chart");
	const chart = new Chart(canvas, {
		type: "line",
		options: {
			scales: {
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: "Weight",
					},
				},
				x: {
					type: "linear",
					title: {
						display: true,
						text: "Probability of Success",
					},
					min: 0,
					max: 1,
					ticks: {
						stepSize: 0.1,
						callback: function (val) {
							return `${val * 100}%`;
						},
					},
				},
			},
			elements: {
				point: {
					radius: 0,
				},
			},
		},
	});
	const cards = loadCards();
	generateResults(cards);
	generateChart(chart, cards);
};
