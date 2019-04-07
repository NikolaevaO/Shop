const goods = [
  {title: "Shirt", price: 150},
  {title: "Socks", price: 50},
  {title: "Jacket", price: 350},
	{title: "Shoes", price: 250},
];

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
//сократить запись можно было бы  убрав фигурные скобки и команду return
//так же добавляем параметры по умолчанию
//const renderGoodsItem = (title = " ", price = 0) =>
//`<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;


//если параметр всего один, кругл. скобки можно не ставить 
const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));

//метод map возвращает новый массив, по-этому после каждого товара на странице выводятся запятые,
//которые убираются преобразованием массива в строку методом join
  document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
}

renderGoodsList(goods);