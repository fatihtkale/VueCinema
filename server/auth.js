const jwt = require("jsonwebtoken");
const config = require("./config.js")

let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        console.log(token)
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        next();
    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;