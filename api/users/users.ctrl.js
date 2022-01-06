// api 로직

let users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'claire' },
  { id: 4, name: 'dan' },
];

const getUserList = (req, res) => {
  const limit = parseInt(req.query.limit || 100, 10);
  const offset = parseInt(req.query.offset || 0, 10);

  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end();

  res.json(users.slice(offset, limit));
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];

  if (!user) return res.status(404).end();

  res.json(user);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter((user) => user.id !== id);
  res.status(204).end();
};

const editUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const name = req.body.name;

  if (Number.isNaN(id)) return res.status(400).end();
  if (!name) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();

  const isConflict = !!users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  user.name = name;
  res.json(user);
};

const registerUser = (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = { id, name };

  if (!name) return res.status(400).end();

  const isConflict = !!users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  users.push(user);
  res.status(201).json(user);
};

module.exports = {
  getUserList,
  getUser,
  deleteUser,
  editUser,
  registerUser,
};
