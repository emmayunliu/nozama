const express = require('express');
const redisFunc = require('./redis');
const neo = require('./neo');
const productDB = require('./productDB');
const userDB = require('./userDB');

const router = express.Router();
// recommend product id to a particular product id
router.get('/collaborative/product/:productId', async (req, res) => {
  const id = req.params.productId.toString();
  const result = await redisFunc.getRecommendByProduct(id);
  res.status(200).json(JSON.parse(result));
});
// recommend product id to a particular user id
router.get('/collaborative/user/:userId', async (req, res) => {
  const id = req.session.body.id.toString() || req.query.userId.toString();
  const result = await redisFunc.getRecommendByUser(id);
  res.status(200).json(JSON.parse(result));
});
// get user analytic data
router.get('/user/analytics', async (req, res) => {
  const data = await productDB.getEvents();
  JSON.parse(data).forEach(row => neo.updateEvent(row.user_id, row.details.PRODUCT));
  res.status(200).json(data);
});
// get user wishlist data
router.get('/user/wishlist', async (req, res) => {
  const data = await userDB.getWishlists();
  JSON.parse(data).forEach(row => neo.updateEvent(row.user_id, row.product_id));
  res.status(200).json(data);
});
// get user order data
router.get('/user/order', async (req, res) => {
  const data = await userDB.getOrders();
  JSON.parse(data).forEach(row => neo.updateEvent(row.user_id, row.product_id));
  res.status(200).json(data);
});

module.exports = router;
