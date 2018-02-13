// read and write Redis database
const redis = require('redis');
const PQueue = require('p-queue');
const { promisify } = require('util');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});
const getAsync = promisify(redisClient.get).bind(redisClient);
const neo = require('./neo');
// cache product recommendation for a particular product in redis
const updateRecommend = async (id, type) => {
  const result = await neo.getRecommendByProduct(id);
  redisClient.set(`${type}${id}`, JSON.stringify(result), redis.print);
};
// product recommendation for a particular product in redis and return a default one if not exists
const getRecommendByProduct = async (id) => {
  const res = await getAsync(`p${id}`);
  if (res === null) {
    updateRecommend(id, 'p');
    return [78800242, 113000316, 439492904, 439340039, 439394058, 439492335, 439492602, 439499488];
  }
  return res;
};
// product recommendation for a particular user in redis and return a default one if not exists
const getRecommendByUser = async (id) => {
  const res = await getAsync(`u${id}`);
  if (res === null) {
    updateRecommend(id, 'u');
    return [78800242, 113000316, 439492904, 439340039, 439394058, 439492335, 439492602, 439499488];
  }
  return res;
};

const initRecommend = async (n, type) => {
  const queue = new PQueue({ concurrency: n });
  queue.add(() => {
    for (let i = 0; i < n; i += 1) {
      updateRecommend(i.toString(), type);
    }
  });
};

module.exports = {
  updateRecommend,
  getRecommendByUser,
  getRecommendByProduct,
  initRecommend,
};

// initRecommend(3001, 'p');

