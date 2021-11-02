const jwt = require('jsonwebtoken');

const Authenticate = (req, res, next) => {
    const token = req.header('Authorize');

    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'Access denied'
        });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    }
    catch {
        return res.status(400).json({
            error: true,
            message: 'Invalid token'
        });
    }
};

module.exports = Authenticate;