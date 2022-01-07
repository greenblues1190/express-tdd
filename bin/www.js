const app = require('../index');
const syncDb = require('./sync-db');
const PORT = 3000;

syncDb().then(() => {
  console.log('All models were synchronized successfully.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
