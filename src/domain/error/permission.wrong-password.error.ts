import { CustomError } from './custom-error'

export class WrongPasswordError extends CustomError {
  constructor() {
    super('permission.wrong-password.error', 403)
  }
}
