const jwt = require('jsonwebtoken');
const jwtSecret = "" +process.env.JWT_SECRET
function generateToken(data){
    const token = jwt.sign(data,jwtSecret)
    return token;
}

function verifyToken(token){
    const data = jwt.verify(token,jwtSecret)

    return data;
}

module.exports = {generateToken,verifyToken}