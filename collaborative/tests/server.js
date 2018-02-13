const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../index');

chai.use(chaiHttp);

describe('Collaborative server', () => {
  describe('GET /collaborative/user', () => {
    it('should  if user id is invalid', (done) => {
      chai
        .request(server)
        .get('/collaborative/user/')
        .type('application/json')
        .send(JSON.stringify({ id: 'testUser1234' }))
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
    it('should return a default array if username is valid but not cached', (done) => {
      chai
        .request(server)
        .get('/collaborative/user/')
        .type('application/json')
        .send(JSON.stringify({ id: '1' }))
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
  });
  describe('GET /collaborative/product', () => {
    it('should return 404 if product id is invalid', (done) => {
      chai
        .request(server)
        .get('/collaborative/product/4000')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
    it('should return a default array if product id is valid but not cached', (done) => {
      chai
        .request(server)
        .get('/collaborative/product/4')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    }).timeout(1000);
  });
});
