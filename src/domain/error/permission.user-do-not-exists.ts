import { CustomError } from './custom-error'

export class UserDoNotExistsError extends CustomError {
  constructor() {
    super('permission.user-do-not-exists.error', 403)
  }
}
