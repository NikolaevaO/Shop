'use strict';
// Фэйк АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		products: [],
		filteredProducts: [],
		imgCatalog: 'http://placehold.it/200x150',
		imgBasket: 'http://placehold.it/80x80',
		searchLine: '',
		basketItems: [],
		showBasket: false,
		basketUrl: '/getBasket.json'
	},
	methods: {
		getJson (url) {
			return fetch (url)
				.then (result => result.json ())
				.catch (error => {
					//console.log (error);
			})
		},
		addProduct(product) {
			this.getJson (`${API}/addToBasket.json`) .then(data => {
					if (data.result) {
						let find = this.basketItems.find(el => el.id_product === product.id_product);
						if (find) {
							find.quantity	++;
						} else {
							let prod = Object.assign({quantity: 1}, product);
								this.basketItems.push(prod);
						}
					}
				});
			return this.basketItems;
		},

		deleteProduct(product) {
			this.getJson (`${API}/deleteFromBasket.json`)
			.then(data => {
				if (data.result) {
					if (product.quantity > 1) {
						product.quantity --;
					}	else {
						this.basketItems.splice(this.basketItems.indexOf(product), 1);
					}
				}
			});
		},

		filterGoods() {
			event.preventDefault();
			let newFilteredProducts = [];
			let regexp = new RegExp(`${this.searchLine == "" ? ".+" : this.searchLine}`, 'ig');
			this.products.forEach(element => {
				if (element.product_name.match(regexp)) {
					newFilteredProducts.push(element);
				} 
			});
			this.filteredProducts = newFilteredProducts;
		},

		userSearch(e) {
			this.searchLine = e.target.value;
			}
		},
	
		mounted () {
			this.getJson (`${API + this.catalogUrl}`)
				.then (data => {
					for (let el of data) {
						this.products.push(el);
						this.filteredProducts.push(el);
				}
			});

			this.getJson (`${API + this.basketUrl}`)
				.then (data => {
					for (let el of data) {
						this.basketItems.push(el);
					}
				});
		
			this.getJson (`getProducts.json`)
				.then (data => {
					for (let el of data) {
							this.products.push (el)
					}
				});
			}
	});

	//window.onload = function() {return;}