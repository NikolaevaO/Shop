let add = (basket, req) => {
  basket.contents.push(req.body); //contents - поле из userBasket.json
  return {newBasket: JSON.stringify(basket, null, 4), name: req.body.product_name};
}

let change = (basket, req) => {
  let find = basket.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return {newBasket: JSON.stringify(basket, null, 4), name: find.product_name};
}

let del = (basket, req) => {
  console.log(`i'm in del. req.params.id = ${req.params.id}`);
  let find = basket.contents.find(el => el.id_product === +req.params.id);
  basket.contents.splice(basket.contents.indexOf (find), 1);
  return {newBasket: JSON.stringify(basket, null, 4), name: find.product_name};
}

module.exports = {add, change, del};

// let delete & baskRouter TODO

