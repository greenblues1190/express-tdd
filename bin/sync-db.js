const { sequelize } = require('../models/models');

module.exports = () => {
  const force = process.env.NODE_ENV === 'test';
  const option = { force };
  return sequelize.sync(option);
};
