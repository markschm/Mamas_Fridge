const express = require('express');
const router = express.Router();
const {
    addItem,
    getItems,
    searchItems,
    removeItem
} = require('../controllers/fridgeController');

router.route('/item').put(addItem);
router.route('/items').get(getItems);
router.route('/search').get(searchItems);
router.route('/item').patch(removeItem);

module.exports = router;
