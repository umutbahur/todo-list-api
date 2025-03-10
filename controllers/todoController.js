const { where } = require('sequelize');
const {Todo} = require('../models');

const createTodo = async (req,res) => {
    const {title, description} = req.body;
    const userId = req.userId;

    try {
        const todo = await Todo.creat({title, description, userId});
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({message: 'failed to creat todo', error});
    }
};

const updateTodo = async (req,res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const userId = req.userId;

    try {
        const todo = await Todo.findOne({where: {id, userId}});
        if (!todo) {
            return res.status(403).json({message: 'Forbidden'});
        }

        todo.title = title;
        todo.description = description;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({message: 'Failed to update todo', error});
    }
};

const deleteTodo = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId

    try {
        const todo = await Todo.findOne({where: {id, userId}});
        if (!todo) {
            res.status(403).json({message: 'Forbidden'});
        }

        await todo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({message: 'Failed to delete todo', error});
    }
};

const getTodos = async (req, res) => {
    const {page = 1, limit = 10} = req.query;
    const offset = (page - 1) * limit;
    const userId = req.userId;

    try {
        const {count, rows} = await Todo.findAndCountAll({
            where: {userId},
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json({
            data: rows,
            page: parseInt(page),
            limit: parseInt(limit),
            total: count,
        });
    } catch (error) {
        res.status(400).json({message: 'Failed to fetch todos', error});
    }
};

module.exports = {createTodo, updateTodo, deleteTodo, getTodos};