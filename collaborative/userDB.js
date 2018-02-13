const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.USERDB_URL || 'mysql://root:@127.0.0.1/nozama',
  user: 'connor',
  password: 'password',
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

const getWishlists = () =>
  connection.queryAsync('SELECT * FROM user_wishlist').then(data => data[0]);

const getOrders = () =>
  connection.queryAsync('SELECT * FROM user_order').then(data => data[0]);

module.exports = {
  getWishlists,
  getOrders,
};
