const express = require('express');
const router = express.Router();

const {
    addTodoItemToAuthenticatedUser, getAllTodoListItemsForAuthenticatedUser, getAuthenticatedUserSingleTodoListItem,
    deleteTodoListItemForAuthenticatedUser, modifyTodoItemForAuthenticatedUser,
    addTodoItem,
    getAllTodoListItems, getSingleTodoItem, deleteTodoItem, modifyTodoItem
} = require("../controllers/todo-item");

const authenticateUser = require('../middleware/authentication');
const {authorizePermissions} = require('../middleware/authorize');

router.route('/u/todoItems')
    .post(authenticateUser, authorizePermissions('user'), addTodoItemToAuthenticatedUser)
    .get(authenticateUser, authorizePermissions('user'), getAllTodoListItemsForAuthenticatedUser);

router.route('/u/todoItems/:id')
    .get(authenticateUser, authorizePermissions('user'), getAuthenticatedUserSingleTodoListItem)
    .delete(authenticateUser, authorizePermissions('user'), deleteTodoListItemForAuthenticatedUser)
    .put(authenticateUser, authorizePermissions('user'), modifyTodoItemForAuthenticatedUser);

router.route('/adm/todoItems')
    .post(authenticateUser, authorizePermissions('admin'), addTodoItem)
    .get(authenticateUser, authorizePermissions('admin'), getAllTodoListItems);

router.route('/adm/todoItems/:id')
    .get(authenticateUser, authorizePermissions('admin'), getSingleTodoItem)
    .delete(authenticateUser, authorizePermissions('admin'), modifyTodoItem)
    .put(authenticateUser, authorizePermissions('admin'), deleteTodoItem);

module.exports = router;



