import { body } from 'express-validator/check';

class Validator {
  validateBody() {
    return [
      body('nickname').exists().isString().isLength({ max: 50 }),
    ];
  }
}

export default Validator;
