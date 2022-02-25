const TodoItem = require("../models/TodoItem")
const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");

const addTodoItem = async (req, res) => {
    const singleTodoItem = req.body;
    const todoItem = await TodoItem.create(singleTodoItem);
    res.status(StatusCodes.CREATED).json({success: true, todoItem : todoItem});
};

const modifyTodoItem = async (req, res) => {
    const  {id: todoListId } = req.params;
    let query = {_id : todoListId};
    const selectedTodoItemForModification = req.body;
    try {
        const updatedTodoItem = await TodoItem.findOneAndUpdate(query, selectedTodoItemForModification, {
            upsert: false,
            new: true
        });
        res.status(StatusCodes.OK).json({success: true, updatedTodoItem});
    } catch (err){
        if (err.statusCode === 404){
            throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
        }else {
            res.status(err.statusCode).json({success: false, message: err.message});
        }
    }

};

const deleteTodoItem = async (req, res) => {
    const { id: todoListId } = req.params;
    let query = {_id : todoListId};
    const todoListItem = await TodoItem.findOne(query);
    if (!todoListItem){
        throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
    }
    await TodoItem.deleteOne(query);
    res.status(StatusCodes.NO_CONTENT).json({success: true, msg: 'Todo-Item has been successfully removed'})
}

const getSingleTodoItem = async (req, res) => {
    const { id: todoListId } = req.params;
    let query = {_id : todoListId};
    const reqTodoItem = req.body;
    const selectedTodoItem = await TodoItem.findOne(query);
    if (!selectedTodoItem){
        throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
    }
    res.status(StatusCodes.OK).json({success: true, selectedTodoItem});
}

const getAllTodoListItems = async (req, res) => {
    const allTodoListItems = await TodoItem.find({});
    res.status(StatusCodes.OK).json({success: true, allTodoListItems, count: allTodoListItems.length});
}

//------------------------------------------------------------------------------------------------------------------

const getAuthenticatedUserSingleTodoListItem = async (req, res) => {
    const { id: todoListId } = req.params;
    let query = {$and: [ {user: req.user.userId}, {_id: todoListId}]};
    const todoListItem = await TodoItem.findOne(query);
    if (!todoListItem){
        throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
    }
    res.status(StatusCodes.OK).json({success: true, todoListItem});
}

const getAllTodoListItemsForAuthenticatedUser = async (req, res) => {
    const allTodoListItems = await TodoItem.find({user: req.user.userId});
    res.status(StatusCodes.OK).json({success: true, allTodoListItems, count: allTodoListItems.length});
}

const addTodoItemToAuthenticatedUser = async (req, res) => {
    req.body.user = req.user.userId;
    if (!req.body.creationDate)delete req.body.creationDate;
    const singleTodoItem = req.body;
    const todoItem = await TodoItem.create(singleTodoItem);
    return res.status(StatusCodes.CREATED).json({success: true, todoItem : singleTodoItem});
};

const modifyTodoItemForAuthenticatedUser = async (req, res) => {
    const { id: todoListId } = req.params;
    let query = {$and: [ {user: req.user.userId}, {_id: todoListId}]};
    const selectedTodoItemForModification = req.body;
    try {
        let updatedTodoItem = await TodoItem.findOneAndUpdate(query, selectedTodoItemForModification, {upsert: false, new:true});
        res.status(StatusCodes.OK).json({success: true, updatedTodoItem});
    } catch(err){
        if (err.statusCode === 404){
            throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
        }else {
            res.status(err.statusCode).json({success: false, message: err.message});
        }
    }
};

const deleteTodoListItemForAuthenticatedUser = async (req, res) => {
    const {id: todoListId} = req.params;
    let query = {$and: [{user: req.user.userId}, {_id: todoListId}]};
    try{
        await TodoItem.findOneAndDelete(query, null);
        res.status(StatusCodes.NO_CONTENT).json({success: true});
    } catch (err) {
        if (err === 404){
            throw new CustomError.NotFoundError(`No todo-item with id ${todoListId}`);
        }
        else {
            res.status(err.statusCode).json({success: false, message: err.message});
        }
    }
};

module.exports = {
    addTodoItem,
    modifyTodoItem,
    deleteTodoItem,
    getSingleTodoItem,
    getAllTodoListItems,
    getAuthenticatedUserSingleTodoListItem,
    getAllTodoListItemsForAuthenticatedUser,
    addTodoItemToAuthenticatedUser,
    modifyTodoItemForAuthenticatedUser,
    deleteTodoListItemForAuthenticatedUser
}
