// 라우팅 설정

const express = require('express');
const router = express.Router();
const ctrl = require('./users.ctrl');

router.get('/', ctrl.getUserList);
router.get('/:id', ctrl.getUser);
router.delete('/:id', ctrl.deleteUser);
router.put('/:id', ctrl.editUser);
router.post('/register', ctrl.registerUser);

module.exports = router;
