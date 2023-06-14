import { CustomError } from './custom-error'

export class InvalidJobError extends CustomError {
  constructor() {
    super('validation.invalid-job.error', 400)
  }
}
