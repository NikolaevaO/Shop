
const hamburgerMenu = {
	size: {
		big: {price: 100, calories: 40},
		small: {price: 50, calories: 20}
	},
	filling: {
		cheese: {price: 10, calories: 20},
		potato: {price: 15, calories: 10},
		salad: {price: 20, calories: 5}
	},
	topping: {
		mayonnaise: {price: 20, calories: 5},
		spice: {price: 15, calories: 0}
	}
};

class Hamburger {
	constructor(size, filling, toppings) {
		this.size = size;
		this.filling = filling;
		this.topping = toppings;
	}

	totalPrice() {
		let result = hamburgerMenu.size[this.size].price;
		result += hamburgerMenu.filling[this.filling].price;
		this.topping.forEach(item => {
			result += hamburgerMenu.topping[item].price;
		});
		return result;
	}
	
	totalCalories() {
		let result = hamburgerMenu.size[this.size].calories;
		result += hamburgerMenu.filling[this.filling].calories;
		this.topping.forEach(item => {
			result += hamburgerMenu.topping[item].calories;
		});
		return result;
	}
}

class FormParser {
	constructor() {
		//у input, выбранных пользователем появляется псевдо класс checked,
		//соотв-нно, считаем только выбираемые эл-ты
		this.size = document.querySelector("input[name='size']:checked").value;
		this.filling = document.querySelector("input[name='filling']:checked").value;
		this.topping = [];
		document.querySelectorAll("input[name='topping']:checked").forEach (item => {
			this.topping.push(item.value);
		});
	}
}
//ф-ция вызывается при загрузке стр., а далее - каждый раз, когда изменяется состояние 
//какого-нибудь эл-та формы. она создает новый экземпляр new Hamburger
function update() {
	let parser = new FormParser();
	let hamburger = new Hamburger(parser.size, parser.filling, parser.topping);
	let price = hamburger.totalPrice();
	document.getElementById("price").innerHTML = price;
	let calories = hamburger.totalCalories();
	document.getElementById("calories").innerHTML = calories;
}

window.onload = update();
