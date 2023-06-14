import { CustomError } from './custom-error'

export class InvalidPasswordError extends CustomError {
  constructor() {
    super('validation.invalid-password.error', 400)
  }
}
