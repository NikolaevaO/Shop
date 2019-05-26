Vue.component('search', {
	data() {
		return {
			searchLine: ''
		}
	},
	
	methods: {
		updateSearchLine () {
			this.searchLine=event.target.value;
		},
	},

	template: `
		<form class="search" action="#">
			<p>
				<input type="text" class="button" placeholder="Поиск по сайту" @input="updateSearchLine">
				<input type="submit" class="button cart-button" value="Найти" @click="$parent.$refs.goods-list.filterGoods(searchLine)">
			</p>
		</form>`
});
