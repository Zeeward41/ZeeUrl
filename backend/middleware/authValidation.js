import { body, validationResult, matchedData } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 16 })
    .withMessage('Name must be 3-16 alphanumeric characters')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('Name must be 3-16 alphanumeric characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)/)
    .withMessage('Password must contain at least one letter, one number, and one special character'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return next(new ErrorResponse(errorMessages.join(', '), 400));
    }
    
    req.matchedData = matchedData(req);
    next();
  }
];

const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)/)
    .withMessage('Password must contain at least one letter, one number, and one special character'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return next(new ErrorResponse(errorMessages.join(', '), 400));
      }
      
      req.matchedData = matchedData(req);
      next();
    }
]

export {validateRegister, validateLogin }