const CustomError = require('../errors');
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    let token;
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        token = bearer[1];
        req.token = token;
    } else if (req.cookies.token){
         token = req.cookies.token;
    }

    if (!token) {
        throw new CustomError.UnAuthenticatedError('Invalid Authentication');
    }
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                throw new CustomError.UnAuthenticatedError('Invalid Authentication');
            } else {
                req.user = {
                    userId : authData.payload.payload.userId,
                    role : authData.payload.payload.role
                }
                next();
            }
        });
    next();
};

module.exports = authenticateUser;

