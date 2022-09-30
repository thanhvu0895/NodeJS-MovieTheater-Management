const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPass = (passWord) =>  bcrypt.hashSync(passWord, 10);

const comparePass = (passWord, hashPassWord ) => bcrypt.compareSync(passWord, hashPassWord)

const generateToken = (data) => jwt.sign(data, "secret", {algorithm: "HS256", expiresIn: "3d"})

const verifyToken = (token) => {
    try {
        return jwt.verify(token, "secret")
    } catch {
        return false;
    }
}

const checkToken = (req, res, next) => {
    let {authentication} = req.headers;
        if(authentication) {
            if(verifyToken(authentication)) {
                next();
            } else {
                res.status(403).send("Invalid Token")
            }
        } else {
            res.status(403).send("Token Missing")
        }
}

module.exports = {
    hashPass,
    comparePass,
    generateToken,
    verifyToken,
    checkToken
}