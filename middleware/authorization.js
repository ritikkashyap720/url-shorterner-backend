const { verifyToken } = require("../utils/jwt");

function restrictedToLoginUserOnly(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ msg: "invalid authtoken" })
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({ msg: "unauthorised" })
    }
    try {
        const user = verifyToken(token)
        if (user) {
            req.user = user
        }
        return next()
    } catch (error) {
        
        return res.json({ msg: "invalid authtoken" })
    }
}

function checkAuthToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next()
    }

    const token = authHeader.split(' ')[1];
    if (token) {
        const user = verifyToken(token);
        if (user) {
            req.user = user;
            return next();
        }
    }
    return next()
}

module.exports = { restrictedToLoginUserOnly, checkAuthToken }