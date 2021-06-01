const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            if (decodedData) req.userId = decodedData.id;
            else req.userId = null;
        } else {
            decodedData = jwt.decode(token);
            if (decodedData) req.userId = decodedData.sub;
            else req.userId = null;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;
