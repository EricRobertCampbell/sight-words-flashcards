export class Card {
	constructor({ front, back, slug, results }) {
		this.front = front;
		this.back = back;
		this.slug = slug;
		this.results = results ? results : [];
	}

	getSuccesses() {
		return this.results.filter((x) => !!x).length;
	}
	getFailures() {
		return this.results.filter((x) => !x).length;
	}
	getSample() {
		return jStat.beta.sample(this.getSuccesses() + 1, this.getFailures() + 1)
	}
	pdf(x) {
		return jStat.beta.pdf(x, this.getSuccesses() + 1, this.getFailures() + 1)
	}
	toJson() {
		return {
			front: this.front,
			back: this.back,
			slug: this.slug,
			results: this.results,
		};
	}
}


export const loadCards = () => {
	const loadedCards = localStorage.getItem("cards");
	const defaultCards = [
		new Card({ front: 1, back: "Uno", slug: "uno" }),
		new Card({ front: 2, back: "Dos", slug: "dos" }),
		new Card({ front: 3, back: "Tres", slug: "tres" }),
		new Card({ front: 4, back: "Cuatro", slug: "cuatro" }),
		new Card({ front: 5, back: "Cinco", slug: "cinco" }),
		new Card({ front: 6, back: "Seis", slug: "seis" }),
		new Card({ front: 7, back: "Siete", slug: "siete" }),
		new Card({ front: 8, back: "Ocho", slug: "ocho" }),
		new Card({ front: 9, back: "Nueve", slug: "nueve" }),
		new Card({ front: 10, back: "Diez", slug: "diez" }),
	];
	const toReturn = loadedCards
		? JSON.parse(loadedCards).map((data) => new Card(data))
		: defaultCards;
	console.log({ toReturn })
	return toReturn
};
export const saveCards = (cards) => {
	console.log('in saveCards with', cards)
	localStorage.setItem(
		"cards",
		JSON.stringify(
			cards.map((card) => card.toJson()),
			null,
			4
		)
	);
};
