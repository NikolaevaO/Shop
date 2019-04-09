const goods = [
  {title: "Shirt", price: 150},
  {title: "Socks", price: 50},
  {title: "Jacket", price: 350},
	{title: "Shoes", price: 250},
];

class Renderer {
  renderGoodsItem = (title, price) =>
    `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

  renderGoodsList = list => {
    let goodsList = list.map(item => this.renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
  }
  //renderBasket = () => {}
};

class Item {
  constructor() {
  //метод для увеличения/уменьшения изображения
  }
};

class Basket {
  constructor() {
    userGoodsList = [];
  //добавятся: метод для открытия/закрытия корзины,
  //добавления/удаления товаров из корзины
  }
  userTotalPrice = () => {
    let userTotalSum = 0;
    for (i = 0; i < this.userGoodsList.length; i++) {
      userTotalSum += this.userGoodsList[i].price;
    }
      return userTotalSum;
  }
};


let renderer = new Renderer();
renderer.renderGoodsList(goods);