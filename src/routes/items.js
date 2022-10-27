const express = require('express');
const itemController = require('../controllers/items');

const router = express.Router();

router.route('/').post(itemController.createItem);

module.exports = router;
