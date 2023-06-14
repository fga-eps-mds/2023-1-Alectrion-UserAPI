import { CustomError } from './custom-error'

export class InvalidUsernameError extends CustomError {
  constructor() {
    super('validation.invalid-username.error', 400)
  }
}
