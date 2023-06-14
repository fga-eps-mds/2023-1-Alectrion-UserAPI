import { CustomError } from './custom-error'

export class InvalidIdError extends CustomError {
  constructor() {
    super('validation.invalid-id.error', 400)
  }
}
