const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('[ERROR] Task validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const getTaskValidations = [

    validateResult

];

const createTaskValidations = [
    body('title')
        .notEmpty().withMessage('You must provide a title')
        .isString().withMessage('Title must be a valid string'),
    
    body('description')
        .isString().withMessage('The description must be a valid string'),

    body('date')
        .notEmpty().withMessage('You must provide a date')
        .isDate().withMessage('Wrong date format'),

    body('time')
        .notEmpty().withMessage('You must provide a time')
        .isString().withMessage('Wrong time format'),

    body('status')
        .notEmpty().withMessage('You must provide a status')
        .isString().withMessage('Invalid status format'),

    body('images')
        .optional()
        .isArray().withMessage('Images must be a String Array'),

    validateResult
];

module.exports = {
    getTaskValidations,
    createTaskValidations
}