const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const { getAllUsers, updateUser, deleteUser, createUser } = require('../controllers/user.controller');

router.get('/', auth, authorize('manager'), getAllUsers);
router.post('/', auth, authorize('manager'), createUser);
router.put('/:id', auth, authorize('manager'), updateUser);
router.delete('/:id', auth, authorize('manager'), deleteUser);

module.exports = router;
