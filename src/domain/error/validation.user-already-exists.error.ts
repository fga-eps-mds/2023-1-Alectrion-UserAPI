import { CustomError } from './custom-error'

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super('validation.user-already-exists.error', 400)
  }
}
