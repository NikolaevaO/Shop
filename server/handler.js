const bask = require ('./bask');
const fs = require ('fs');

const actions = {
  add: bask.add,
  change: bask.change,
  delete: bask.del
}

let handler = (req, res, action, file) => {
  fs.readFile (file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus (404, JSON.stringify ({result: 0, text: err}));
    } else {
      let {newBasket, name} = actions[action](JSON.parse (data), req);
      fs.writeFile (file, newBasket, (err) => {
        if (err) {
          res.sendStatus (404, JSON.stringify ({result: 0, text: err}));
        } else {
          res.send ({result: 1, text: 'Успешно'})
        }
      }) 
    }
  })
}

module.exports = handler;