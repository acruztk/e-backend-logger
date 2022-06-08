const authorizationsSchema = require('../models/Authorizations.js');
const isValidAuthorization = async (req, res, next) => {
    try {

        if (req.headers.authorization) {

            const token = req.headers.authorization;
            if (token) {
                const payload = await authorizationsSchema.findOne({ token });
                if (payload) {
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "No authorization header" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};


module.exports = isValidAuthorization;