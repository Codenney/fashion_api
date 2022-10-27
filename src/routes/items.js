const express = require('express');
const itemController = require('../controllers/items');

const router = express.Router();

router
.route('/').post(itemController.createItem)
// .patch(itemController.updateItem);

router.route('/:id').delete(itemController.isValid, itemController.deleteItem);

module.exports = router;
