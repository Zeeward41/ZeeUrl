import { body, validationResult, matchedData } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

const validateUrl = [
    body('url')
      .isURL()
      .withMessage('Please enter a valid URL'),
  
    body('alias')
      .optional()
      .matches(/^[a-zA-Z0-9-_]+$/)
      .withMessage('Alias not valid'),
  
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

const validateUpdateUrl = [
    body('link_original')
      .optional()
      .isURL()
      .withMessage('Please enter a valid URL'),
  
    body('token')
      .optional()
      .matches(/^[a-zA-Z0-9-_]+$/)
      .withMessage('Alias not valid'),
    
    body('num_visit')
      .optional()
      .isInt({min: 0})
      .withMessage('Value not valid (Positive integer)'),

    body('num_unique_visite')
      .optional()
      .isInt({min: 0})
      .withMessage('Value not valid (Positive integer)'),

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
  
  export {validateUrl, validateUpdateUrl }
