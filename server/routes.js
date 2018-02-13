const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const passport = require('./passport');
const collaborative = require('../collaborative/index');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});
redisClient.on('error', console.error);

const router = express.Router();

// router.use(session({
//   store: new RedisStore({
//     host: process.env.REDIS_HOST || '54.84.194.73',
//     port: process.env.REDIS_PORT || 6379,
//     client: redisClient,
//     ttl: 260,
//   }),
//   secret: 'nozama',
//   resave: false,
//   saveUninitialized: false,
// }));
router.use(passport.initialize());
router.use(passport.session());

router.get(
  '/whoami',
  (req, res) => (req.session.passport ? res.json(req.session.passport.user) : res.sendStatus(401)),
);

router.post('/auth', passport.authenticate('local'), (req, res) =>
  res.set('access-control-allow-credentials', 'true').sendStatus(200));

router.get('/auth', (req, res) =>
  req.session.destroy(() => {
    res.clearCookie('connect.sid').sendStatus(200);
  }));

/*
* Add additional routers below
*/
router.use(collaborative);
module.exports = router;
