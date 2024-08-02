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
  
  export {validateUrl }
