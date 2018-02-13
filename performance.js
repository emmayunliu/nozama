const siege = require('siege');
siege()
  .on(3000)
  .for(100).times
  .get('/collaborative/product/100')
  // .get('/collaborative/user', { userId: '10' })
  .attack()