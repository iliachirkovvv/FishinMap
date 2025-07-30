const express = require('express');
const router = express.Router();
const { getAllUsers, loginUser, getUsersWithRank4, upgradeToExpert } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.get('/rank4', getUsersWithRank4);
router.put('/upgrade/:id', upgradeToExpert);

module.exports = router;
