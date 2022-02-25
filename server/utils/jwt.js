const jwt = require('jsonwebtoken')

const createJWT = ( payload ) => {
    const token = jwt.sign({payload}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;

};

const attachCookiesToResponse = ( {res, user} ) => {
    const token = createJWT({payload : user});

    const oneYear = 1000 * 60 * 60 * 24 * 12;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneYear),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
    return token;
};

const expireToken = (res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
}

module.exports = {
    createJWT,
    attachCookiesToResponse,
    expireToken
}
