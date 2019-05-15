Vue.component('goods-list', {
	data() {
		return {
			filteredProducts: [],
			catalogUrl: '/catalogData.json',
			products: []
		}
	},

	methods: {
		filterGoods() {
			event.preventDefault();
			let newFilteredProducts = [];
			let regexp = new RegExp(`${searchLine == "" ? ".+" : searchLine}`, 'ig');
			this.products.forEach(element => {
				if (element.product_name.match(regexp)) {
					newFilteredProducts.push(element);
				} 
			});
			this.filteredProducts = newFilteredProducts;
		},
	},

	mounted () {
		this.$parent.getJson (`${API + this.catalogUrl}`)
			.then (data => {
				for (let el of data) {
					this.products.push(el);
					this.filteredProducts.push(el);
				}
			});
		// Генерирует ошибку для тестирования показа сообщения об ошибке
		this.$parent.getJson(`getFake.json`)
			.then(data => {
				for(let el of data) {
						this.products.push(el);
				}
			});
		},

	template:
		`<div class="goods-list" :products="filteredProducts">
			<goods-item
			v-for="product of products"
			:key="product.id_product"
			:product="product"></goods-item>
		</div>`
});

Vue.component('goods-item', {
	data() {
		return {
			imgCatalog: 'http://placehold.it/200x150'
		}
	},
	props: ['product'],
	template:
    `<div class="goods-item">
			<img :src="imgCatalog" alt="some image">
			<div class="desc">
				<h3>{{ product.product_name }}</h3>
				<p>{{ product.price }}</p>
				<button class="buy-button" @click="$root.$refs.basket.addProduct(product)">Купить</button>
			</div>
		</div>`
});
