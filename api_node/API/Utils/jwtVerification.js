const jwt = require('jsonwebtoken');
const httpContext = require('express-http-context');

const authenticate = (req, res, next) => {
    try {        
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,"User Details");
        const AuthKey = decodedToken.AuthKey;
        if(!AuthKey || Date(decodedToken.exp) < Date.now()){
            console.log(AuthKey)
            throw new Exception("invalid token.");
        }
        httpContext.set('AuthKey', AuthKey)
        next();
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports = authenticate;