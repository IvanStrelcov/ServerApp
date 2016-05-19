const express = require('express');
const router = express.Router();
const controller = require('../controllers/card');

router.get('/:id', controller.get);

router.post('/', controller.post);

router.delete('/:id', controller.delete);

router.put('/:id', controller.changeTitle);

module.exports = router;
