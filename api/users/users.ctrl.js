// api 로직

const { User } = require('../../models/models');

const getUserList = (req, res) => {
  const limit = parseInt(req.query.limit || 100, 10);
  const offset = parseInt(req.query.offset || 0, 10);

  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end();

  User.findAll({ limit, offset }).then((users) => {
    res.status(200).json(users);
  });
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) res.status(400).end();

  User.findOne({
    where: { id },
  }).then((user) => {
    if (!user) return res.status(404).end();
    res.status(200).json(user);
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  User.destroy({ where: { id } }).then(() => {
    res.status(204).end();
  });
};

const editUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const name = req.body.name;

  if (Number.isNaN(id)) return res.status(400).end();
  if (!name) return res.status(400).end();

  User.findOne({ where: { id } }).then((user) => {
    if (!user) return res.status(404).end();

    user.name = name;
    user
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError')
          return res.status(409).end();

        res.status(500).end();
      });
  });
};

const registerUser = (req, res) => {
  const name = req.body.name;

  if (!name) return res.status(400).end();

  // if (!!users.length)
  User.create({ name })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError')
        return res.status(409).end();

      res.status(500).end();
    });
};

module.exports = {
  getUserList,
  getUser,
  deleteUser,
  editUser,
  registerUser,
};
