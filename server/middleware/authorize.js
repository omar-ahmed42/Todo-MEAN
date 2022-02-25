const CustomError = require('../errors');

const authorizePermissions = (...roles) => {
    return (req, res) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnAuthorizedError('UnAuthorized to access this route');
        }
    };
    };

module.exports = {
    authorizePermissions
};

