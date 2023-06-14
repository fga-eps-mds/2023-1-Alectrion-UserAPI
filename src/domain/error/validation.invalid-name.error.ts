import { CustomError } from './custom-error'

export class InvalidNameError extends CustomError {
  constructor() {
    super('validation.invalid-name.error', 400)
  }
}
