const { body, param, query, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('[ERROR] Event validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validación: Obtener por ID
const getEventByIdValidations = [
  param('id')
    .notEmpty().withMessage('ID is required.')
    .isMongoId().withMessage('ID must be a valid Mongo ID.'),

    validateResult
];

// Validación: Filtrado
const filterEventValidations = [
    query('status')
        .optional()
        .isIn(['pending', 'completed', 'in-progress', 'all']).withMessage('Invalid status filter.'),

    query('fav')
        .optional()
        .isIn(['true', 'false']).withMessage('Invalid fav value (must be "true" or "false").'),

    validateResult
];

// Validación: Crear evento
const createEventValidations = [
  body('title')
    .notEmpty().withMessage('Title is required.')
    .isString().withMessage('Title must be a string.'),
  
  body('status')
    .notEmpty().withMessage('Status is required.')
    .isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid status.'),

  body('date')
    .notEmpty().withMessage('Date is required.')
    .isISO8601().withMessage('Date must be a valid date.')
    .toDate(),

  body('time')
    .optional()
    .isString().withMessage('Time must be a string.'),

  body('country')
    .optional()
    .isString().withMessage('Country must be a string.'),

  body('city')
    .optional()
    .isString().withMessage('City must be a string.'),

  body('details')
    .optional()
    .isString().withMessage('Details must be a string.'),

  body('userID')
    .optional()
    .isMongoId().withMessage('User ID must be a valid Mongo ID.'),

    validateResult
];

// Validación: Actualizar evento
const updateEventValidations = [
  body('id')
    .notEmpty().withMessage('ID is required.')
    .isMongoId().withMessage('ID must be a valid Mongo ID.'),

  body('updatedData.title')
    .optional()
    .isString().withMessage('Title must be a string.'),

  body('updatedData.status')
    .optional()
    .isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid status.'),

  body('updatedData.date')
    .optional()
    .isISO8601().withMessage('Date must be a valid ISO8601 date.')
    .toDate(),

  body('updatedData.time')
    .optional()
    .isString().withMessage('Time must be a string.'),

  body('updatedData.country')
    .optional()
    .isString().withMessage('Country must be a string.'),

  body('updatedData.city')
    .optional()
    .isString().withMessage('City must be a string.'),

  body('updatedData.details')
    .optional()
    .isString().withMessage('Details must be a string.'),

    validateResult
];

// Validación: Eliminar
const deleteEventValidations = [
  param('id')
    .notEmpty().withMessage('ID is required.')
    .isMongoId().withMessage('ID must be a valid Mongo ID.'),

    validateResult
];

module.exports = {
    getEventByIdValidations,
    filterEventValidations,
    createEventValidations,
    updateEventValidations,
    deleteEventValidations
};