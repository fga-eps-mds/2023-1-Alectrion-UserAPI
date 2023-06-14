import { CustomError } from './custom-error'

export class InvalidCpfError extends CustomError {
  constructor() {
    super('validation.invalid-cpf.error', 400)
  }
}
