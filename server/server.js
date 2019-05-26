const express = require('express');
const fs = require('fs');
const app = express();
const router = require('./router');


app.use(express.json ());// определение JSON
app.use('/', express.static('public'));// указ. назв-е директории с frontend-ом
app.use('/api/basket', router);

app.get ('/api/products', (req, res) => {
  fs.readFile ('server/db/products.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus (404, JSON.stringify ({result: 0, text: err}));
		}	else {
			res.send (data);
		}
	})
});

app.listen (3000, () => ('listening at port 3000'));

