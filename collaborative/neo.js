// read and write Neo4J database
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '1'));
const session = driver.session();
// recommend a list of product id to a particular product
const getRecommendByProduct = id => session
  .run('match (a:Product {id: {param}})<-[:relation]-(similaruser),(similaruser)-[:relation]->(product2) with a.id as id, product2.id as recommend, count(*) as strength where strength>5 return id, recommend, strength order by strength desc limit 10;', { param: id })
  .then((result) => {
    const list = [];
    result.records.forEach((record) => {
      list.push(record.get('recommend'));
    });
    return list;
  });
// recommend a list of product id to a particular user
const getRecommendByUser = id => session
  .run('match (u:User {id: {param}})-[:relation]->(a:Product)<-[:relation]-(similaruser),(similaruser)-[:relation]->(product2) with product2.id as recommend, count(*) as strength where strength>5 return recommend, strength order by strength desc limit 10;', { param: id })
  .then((result) => {
    const list = [];
    result.records.forEach((record) => {
      list.push(record.get('recommend'));
    });
    return list;
  });
// get Node from Neo4J
const getNode = (id, type) => session
  .run(`Match (a:${type} {id: {param}}) return a.id as id`, { param: id })
  .then(result => (result.records.length !== 0 ? result.records[0]._fields[0] : undefined))
  .catch(err => console.error(err));
// create a Node in Neo4J
const updateNode = (id, type) => session
  .run(`create (:${type} {id: {param}})`, { param: id })
  .then(() => 'update success');
// create relationship between nodes
const updateEvent = (userId, productId) => session
  .run('MATCH (user:User {id: {userParam}}) MERGE(product: Product { id: {productParam} }) MERGE(user) - [:relation] -> (product)', { userParam: userId, productParam: productId })
  .then(() => 'update success');
// delete node from Neo4J
const deleteNode = (id, type) => session
  .run(`Match (a:${type} {id: {param}}) Detach Delete a`, { param: id })
  .then(() => 'delete success');

// const mergeNewEvent = async (userId, productId) => {
//   const user = await getNode(userId, 'u');
//   const product = await getNode(productId, 'p');
//   if (user === undefined) {
//     updateNode(userId, 'u');
//   }
//   if (product === undefined) {
//     updateNode(product, 'p');
//   }
//   updateEvent(user, product);
// };

module.exports = {
  getRecommendByProduct,
  getRecommendByUser,
  updateNode,
  updateEvent,
  deleteNode,
  getNode,
  // mergeNewEvent,
};

// setInterval(mergeNewEvent, 60000);

