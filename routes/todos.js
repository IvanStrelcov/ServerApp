const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo');

router.get('/:id', controller.get);

router.post('/', controller.post);

router.delete('/:id', controller.delete);

router.put('/:id', controller.changeTitle);

router.put('/status/:id', controller.changeStatus);

module.exports = router;
