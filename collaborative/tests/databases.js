const { expect } = require('chai');
const chai = require('chai');

const neo = require('../neo');
const redis = require('../redis');

describe('Neo and Redis Database', () => {
  describe('neo.getUserNode', () => {
    it('should return user id for valid user id in database', (done) => {
      neo.getNode('1', 'User').then((data) => {
        expect(data).to.be.a('string');
        done();
      }).catch(done);
    }).timeout(1000);
    it('should return nothing for user name not in database', (done) => {
      neo.getNode('user-1', 'User').then((data) => {
        expect(data).to.equal(undefined);
        done();
      }).catch(done);
    });
  });
  describe('neo.getProductNode', () => {
    it('should return product id for valid product id in database', (done) => {
      neo.getNode('1', 'Product').then((data) => {
        expect(data).to.be.a('string');
        done();
      }).catch(done);
    });
    it('should return nothing for product id not in database', (done) => {
      neo.getNode('product-1', 'Product').then((data) => {
        expect(data).to.equal(undefined);
        done();
      }).catch(done);
    });
  });
  describe('neo.getRecommendByProduct', () => {
    it('should return recommendation product id for valid product id in database', (done) => {
      neo.getRecommendByProduct('p1').then((data) => {
        expect(data).to.be.a('array');
        done();
      }).catch(done);
    });
    it('should return nothing for product id not in database', (done) => {
      neo.getNode('-1', 'Product').then((data) => {
        expect(data).to.equal(undefined);
        done();
      }).catch(done);
    });
  });
  describe('neo.getRecommendByUser', () => {
    it('should return recommendation product id for valid user id in database', (done) => {
      neo.getRecommendByUser('u1').then((data) => {
        expect(data).to.be.a('array');
        done();
      }).catch(done);
    });
    it('should return nothing for product id not in database', (done) => {
      neo.getNode('-1').then((data) => {
        expect(data).to.equal(undefined);
        done();
      }).catch(done);
    });
  });
  describe('redis.getRecommendByProduct', () => {
    it('should return default recommendation for non cache user id in database', (done) => {
      redis.getRecommendByProduct('p-1').then((data) => {
        expect(JSON.parse(data)).to.be.a('array');
        done();
      }).catch(done);
    });
  });
  describe('redis.getRecommendByUser', () => {
    it('should return default recommendation for non cache product id in database', (done) => {
      redis.getRecommendByUser('u-1', 'Product').then((data) => {
        expect(data).to.be.a('array');
        done();
      }).catch(done);
    });
  });
  describe('redis.getRecommendByProduct', () => {
    it('should return recommendation for cache product id in database', (done) => {
      redis.getRecommendByProduct('p1').then((data) => {
        expect(JSON.parse(data)).to.be.a('array');
        done();
      }).catch(done);
    });
  });
  describe('redis.getRecommendByUser', () => {
    it('should return recommendation for cache user id in database', (done) => {
      redis.getRecommendByUser('u1').then((data) => {
        expect(data).to.be.a('array');
        done();
      }).catch(done);
    });
  });
});
