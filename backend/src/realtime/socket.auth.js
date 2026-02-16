const jwt = require("jsonwebtoken");

async function verifySocketToken(token){
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded || !decoded.id) {
            throw new Error("invalid token payload");
        }

        return decoded;
    }catch(error){
        throw new Error("Unauthorized socket connection");
    }
}

module.exports = {
    verifySocketToken
};