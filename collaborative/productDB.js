// get product analytic data from product service
const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.PRODUCTDB_URL || 'mysql://root:@127.0.0.1/nozama',
  user: 'nozama',
  password: 'ayylmao',
  database: 'nozama',
});

connection.queryAsync = function queryAsync(...args) {
  return new Promise((resolve, reject) => {
    this.query(...args, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const getEvents = () =>
  connection.queryAsync('SELECT * FROM product_analytics').then(data => data[0]);

module.exports = {
  getEvents,
};
