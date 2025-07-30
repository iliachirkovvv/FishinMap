const express = require('express');
const router = express.Router();
const { getAllUsers, loginUser, getUsersWithRank4 } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.get('/rank4', getUsersWithRank4);


module.exports = router;
