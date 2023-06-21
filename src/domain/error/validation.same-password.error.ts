import { CustomError } from './custom-error'

export class SamePasswordError extends CustomError {
  constructor() {
    super('validation.same-password.error', 400)
  }
}
