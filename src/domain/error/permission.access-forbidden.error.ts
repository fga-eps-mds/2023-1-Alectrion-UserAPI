import { CustomError } from './custom-error'

export class AccessForbiddenError extends CustomError {
  constructor() {
    super('permission.access-forbidden.error', 403)
  }
}
