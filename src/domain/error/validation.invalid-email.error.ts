import { CustomError } from './custom-error'

export class InvalidEmailError extends CustomError {
  constructor() {
    super('validation.invalid-email.error', 400)
  }
}
