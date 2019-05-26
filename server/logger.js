const moment = require('moment');
const fs = require('fs');

const logger = (name, action) => {
  fs.readFile('server/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('Ошибка чтения файла')
    } else {
      const stat = JSON.parse(data);
      stat.push({
        time: moment().format('DD.MM.YYYY, HH:mm:ss'),
        prod_name: name,
        action: action
      });
      fs.writeFile('server/stats.json', JSON.stringify(stat, null, 2), (err) => {
        if (err) {
          console.log('Ошибка записи файла')
        }
      })
    }
  })
}

module.exports = logger;