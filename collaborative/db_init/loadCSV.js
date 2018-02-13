const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '1'));
const session = driver.session();

// for over 1M data entry, need load CSV file to Neo4J
const fileName = 'event1517601565284.csv';
session.run('USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM \'file:///event1517601565284.csv\' AS line CREATE (:Test {id: line.user_id});');


// for under 1M data entry
// // load product data to neo4j
// for (var key in products) {
//   let property = products[key]
//   session.run(`CREATE (${key}:Product {name: {nameParam}, category:{category}, price:{price},id:{id},description:{description}})`,
//   	{nameParam: property.product_name, category:property.product_category, price:property.product_price,id:property.product_id,description:property.product_description});
// }
// // load user data to neo4j
// for (var key in users) {
//   let property = users[key]
//   console.log(key, typeof key)
//   session.run(`CREATE (${key}:User {name: {nameParam}, region:{region}, age:{age},id:{id},group:{group}})`,
//   	{nameParam: property.user_name, region:property.user_region, age:property.user_age,id:property.user_id,group:property.user_group});
// }
// // load event data to neo4j
// for (var index in events) {
//   let property = events[index];
//   session.run(`MATCH (a:Product {id: {product_id}}),(b:User {id: {user_id}}) CREATE (b)-[r:${property.event_type}]->(a) RETURN r`, {
// 		product_id: property.event_product_id, user_id: property.event_user_id, event: property.event_type})
// }
