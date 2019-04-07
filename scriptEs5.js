
 var goods = [
  {title: "Shirt", price: 150},
  {title: "Socks", price: 50},
  {title: "Jacket", price: 350},
	{title: "Shoes", price: 250},
];

function renderGoodsItem(title = " ", price = 0) {
  return '<div class="goods-item"><h3>' + title + '</h3><p>' + price + '</p></div>';
};

function renderGoodsList(list) {
  var goodsList = list.map(function (item) {
    return renderGoodsItem(item.title, item.price);
  });
//метод map возвращает новый массив, по-этому после каждого товара на странице выводятся запятые,
//убираем преобразованием массива в строку методом join
  document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
};

renderGoodsList(goods);
