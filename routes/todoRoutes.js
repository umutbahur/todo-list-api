const express = require('express');
const {authenticate} = require('../middleware/authMiddleware');
const {createTodo, updateTodo, deleteTodo, getTodos} = require('../controllers/todoController');

const router = express.Router();

router.post('/', authenticate, createTodo);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);
router.get('/', authenticate, getTodos);

module.exports = router;