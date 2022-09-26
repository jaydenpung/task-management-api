import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  getType() {
    return 'Validation Exception';
  }
}
