import { CustomError } from './custom-error'

export class InvalidRoleError extends CustomError {
  constructor() {
    super('validation.invalid-role.error', 400)
  }
}
