const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
        if(err){
            res.status(403).json(err);
        }
        req.user = {"email":data.email}
        next();
    });
}

module.exports = {verifyToken};