const { body, param, query, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('[ERROR] Task validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const getTaskByIdValidations = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isMongoId().withMessage('ID inválido'),

    validateResult
];

const filterTasksValidations = [
    query('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed', 'all']).withMessage('Ivalid status filter'),

    query('fav')
        .optional()
        .isBoolean().withMessage('Fav must be a valid boolean'),

    validateResult
];

const createTaskValidations = [
    body('title')
        .notEmpty().withMessage('You must provide a title')
        .isString().withMessage('Title must be a valid string'),
    
    body('status')
        .notEmpty().withMessage('You must provide a status')
        .isString().withMessage('Invalid status format'),

    body('date')
        .notEmpty().withMessage('Date is required.')
        .isISO8601().withMessage('Date must be a valid ISO8601 string.')
        .toDate(),

    body('time')
        .notEmpty().withMessage('You must provide a time')
        .isString().withMessage('Wrong time format'),

    body('description')
        .isString().withMessage('The description must be a valid string'),

    body('images')
        .optional()
        .isArray().withMessage('Images must be a String Array'),

    validateResult
];

const updateTaskValidations = [
    body('id')
        .notEmpty().withMessage('ID es obligatorio')
        .isMongoId().withMessage('ID no válido'),

    body('updatedData')
        .isObject().withMessage('Debe proporcionar un objeto de datos a actualizar'),

    body('updatedData.title')
        .optional()
        .isString().withMessage('Title must be a valid string'),

    body('updatedData.status')
        .optional()
        .isString().withMessage('Invalid status format'),

    body('updatedData.date')
        .notEmpty().withMessage('Date is required.')
        .isISO8601().withMessage('Date must be a valid ISO8601 string.')
        .toDate(),
    
    body('updatedData.time')
        .optional()
        .isString().withMessage('Wrong time format'),
    
    body('updatedData.description')
        .optional()
        .isString(),

    validateResult
];


module.exports = {
    getTaskByIdValidations,
    filterTasksValidations,
    createTaskValidations,
    updateTaskValidations,
}