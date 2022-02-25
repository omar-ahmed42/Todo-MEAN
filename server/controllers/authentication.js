const User = require("../models/User")
const CustomError = require("../errors");
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const createUserToken = require("../utils/UserToken");
const {attachCookiesToResponse, expireToken} = require("../utils/jwt");

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        throw new CustomError.BadRequestError(`Please provide email and password`);
    }

    const user = await User.findOne({'email': email});
    if (!user){
        throw new CustomError.NotFoundError(`Email or password is invalid`)
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect){
        throw new CustomError.NotFoundError(`Email or password is invalid`)
    }

    const userToken = createUserToken(user);
    const token = attachCookiesToResponse({res, user: userToken});
    res.status(StatusCodes.OK).json({success: true, user: userToken, msg: 'successful login', token: token});
}

const logout = async (req, res) => {
    expireToken(res);
    res.status(StatusCodes.OK).json({success: true, msg: 'User has successfully logged out'});
};

module.exports = {
    login,
    logout
}
