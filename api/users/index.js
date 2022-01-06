// 라우팅 설정

const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'claire' },
  { id: 4, name: 'dan' },
];

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit || 100, 10);
  const offset = parseInt(req.query.offset || 0, 10);

  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end();

  res.json(users.slice(offset, limit));
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];

  if (!user) return res.status(404).end();

  res.json(user);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

router.put('/:id', (req, res) => {
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
});

router.post('/register', (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = { id, name };

  if (!name) return res.status(400).end();

  const isConflict = !!users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  users.push(user);
  res.status(201).json(user);
});

module.exports = router;
