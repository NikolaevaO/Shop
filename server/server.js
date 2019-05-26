const express = require ('express');
const fs = require ('fs');
const app = express ();
const handler = require ('./handler');


app.use (express.json ());// определение JSON
app.use ('/', express.static('public'));// указ. назв-е директории с frontend-ом

app.get ('/api/products', (req, res) => {
  fs.readFile ('server/db/products.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus (404, JSON.stringify ({result: 0, text: err}));
		}	else {
			res.send (data);
		}
	})
});

app.get ('/api/basket', (req, res) => {
  fs.readFile ('server/db/userBasket.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus (404, JSON.stringify ({result: 0, text: err}));
		}	else {
			res.send (data);
		}
	})
});


app.post ('/api/basket', (req, res) => {
	handler (req, res, 'add', 'server/db/userBasket.json');
});

app.put ('/api/basket/:id', (req, res) => {
	handler (req, res, 'change', 'server/db/userBasket.json');
});

app.delete ('/api/basket/:id', (req, res) => {
	console.log(res);
	handler (req, res, 'delete', 'server/db/userBasket.json');
});

app.listen (3000, () => ('listening at port 3000'));




//В экспрессе получаем особые методы отлова запросов
// app.get();
// app.post();
// app.put();
// app.delete();
