const User = require("../models/User")
const CustomError = require("../errors");
const createUserToken = require("../utils/UserToken");
const {attachCookiesToResponse} = require("../utils/jwt");
const {StatusCodes} = require("http-status-codes");

const signup = async (req, res) => {
    const {name, email, password} = req.body;
    const isEmailAlreadyTaken = await User.findOne({email});
        if (isEmailAlreadyTaken) {
            throw new CustomError.BadRequestError('This email is already taken');
        }
    const role = 'user';
    const user = await User.create({name, email, password, role})
    const userToken = createUserToken(user);
    const token = attachCookiesToResponse({ res,  user: userToken });
    res.status(StatusCodes.CREATED).json({success: true, user : userToken});
};

module.exports = {
    signup
};
