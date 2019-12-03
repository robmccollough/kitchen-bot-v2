const jwt = require('jsonwebtoken')

async function authenticateUser(req, res, next) {
    if (!req.token) {
        return res.status(401).send({
            error: 'Authorization header not sent. This route requires the user to authenticate.' +
                ' If you passed a jwt token, make sure it is a \'Bearer\' token.',
            example: 'inside authorization header: Bearer jws.token.here'
        })
    }
        
    jwt.verify(req.token, process.env.JWT_KEY, (err, decoded) => {
        if (err){
            return res.status(401).send({err: 'Invalid or expired jwt token.', msg: err})
        }
        req.user_id = decoded.user_id
        next();
    })
    
}

module.exports = authenticateUser;