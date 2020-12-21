const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ msg: "No authentication token" });
        }
        const verified = jwt.verify(token, process.env.SECRET_JWT_ACCESS_TOKEN);

        if (!verified) {
            return res
                .status(401)
                .json({ msg: "Token verification failed" });
        }

        req.userId = verified.userId;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;