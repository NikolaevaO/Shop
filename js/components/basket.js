Vue.component('basket', {
	data () {
		return {
			basketItems: [],
			showBasket: false,
			basketUrl: '/getBasket.json'
		}
	},

	methods: {
		addProduct(product) {
			this.$parent.getJson (`${API}/addToBasket.json`) .then(data => {
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
		},

		deleteProduct(product) {
			this.$parent.getJson (`${API}/deleteFromBasket.json`)
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
	},
	
	mounted () {
		this.$parent.getJson (`${API + this.basketUrl}`)
			.then (data => {
				for (let el of data) {
					this.basketItems.push(el);
				}
			});
	},

	template: `
	<div class="basket">
		<button class="button cart-button" type="button" @click="showBasket = !showBasket">Корзина</button>
		<div class="basket-block" v-show="showBasket">
			<p v-if="!basketItems.length">Ваша корзина пуста</p>
			
			<basket-item 
			v-for="product of basketItems" 
			:key="product.id_product"
			:basket-item="product">
			</basket-item>
		</div>
	</div>`
});

Vue.component('basket-item', {
	data () {
		return {
			imgBasket: 'http://placehold.it/80x80'
		}
	},
	props: ['basketItem'],
	template: `
	<div class="basket-item">
		<img :src="imgBasket" alt="Изображение">
		<div class="prod-description">
			<p class="prod-title"> {{ basketItem.product_name }}</p>
			<p class="prod-quantity"> Quantity: {{ basketItem.quantity }}</p>
			<p class="prod-price">$ {{ basketItem.price }} each</p>
		</div>
		<div class="right-block">
			<p class="product-price"> {{ basketItem.quantity*basketItem.price }}</p>
			<button class="del-button" @click="$parent.deleteProduct(basketItem)">&times;</button>
		</div>
	</div>`
});

