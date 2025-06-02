const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('[ERROR] Event validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const getEventValidations = [

]

module.exports = {
    getEventValidations
}