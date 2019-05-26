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
			let find = this.basketItems.find(el => el.id_product === product.id_product);
				if (find) {
					this.$parent.putJson (`/api/basket/${find.id_product}`, {quantity: 1})
						.then (data => {
							if (data.result) {
								find.quantity ++;
							}
						})	
				}	else {
						let prod = Object.assign ({quantity: 1}, product);
						//post запрос чтобы записать товар в корз.,если его там нет
						this.$parent.postJson (`/api/basket`, prod)
						.then (data => {
							if (data.result) {
								this.basketItems.push (prod);
							}
						})	
				}
		},

		deleteProduct(product) {
			if (product.quantity > 1) {
				this.$parent.putJson(`/api/basket/${product.id_product}`, {quantity: -1})
						.then (data => {
							if (data.result) {
								product.quantity --
							}
						})
		} else {
				this.$parent.deleteJson(`/api/basket/${product.id_product}`)
						.then (data => {
								if (data.result) {
										this.basketItems.splice(this.basketItems.indexOf(product), 1);
								}
							})
					}
			},
	},
	
	mounted () {
		this.$parent.getJson (`/api/basket`)
			.then (data => {
				for (let el of data.contents) {
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

