const _progress = require('cli-progress');

const bar1 = new _progress.Bar({}, _progress.Presets.shades_classic);
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const path = '../../../../../Library/Application\ Support/Neo4j\ Desktop/Application/neo4jDatabases/database-c1894e14-44aa-4f55-8bbd-1016b90bc584/installation-3.3.2/import/';

// create CSV file with single nodes
const createSingleNode = async (n, fileName) => {
  bar1.start(n, 0);
  const csvWriter = createCsvWriter({
    path: `${path}/${fileName}${Date.now()}.csv`,
    header: [
      { id: 'id', title: 'id' },
    ],
  });
  const records = [];
  for (let i = 1; i < n + 1; i++) {
    const id = Math.floor(Math.random() * n);
    records.push({ id });
    bar1.update(i);
  }
  csvWriter.writeRecords(await records) // returns a promise
    .then(() => {
      console.log('...Done');
    });
  bar1.stop();
};

// create relation between two type of nodes
const createRelation = async (n, fileName) => {
  bar1.start(n, 0);
  const csvWriter = createCsvWriter({
    path: `${path}/${fileName}${Date.now()}.csv`,
    header: [
      { id: 'user_id', title: 'user_id' },
      { id: 'product_id', title: 'product_id' },
    ],
  });
  const records = [];
  for (let i = 1; i < n + 1; i++) {
    const user_id = Math.floor(Math.random() * 1000000);
    const product_id = Math.floor(Math.random() * 3000);
    records.push({ user_id, product_id });
    bar1.update(i);
  }
  csvWriter.writeRecords(await records) // returns a promise
    .then(() => {
      console.log('...Done');
    });
  bar1.stop();
};

createRelation(1000000, 'user');
