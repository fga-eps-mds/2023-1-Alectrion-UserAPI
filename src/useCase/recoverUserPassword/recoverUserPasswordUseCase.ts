import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { User } from '../../db/entities/user'
import { sendEmail } from '../../services/mailer'

export interface RecoverUserPasswordData {
  email: string
}

export class EmailNotFoundError extends Error {
  constructor() {
    super('Não foi possivel encontrar o e-mail informado.')
    this.name = 'EmailNotFoundError'
  }
}

export class RecoverUserPasswordUseCase
  implements
    UseCase<{
      message: string
      user: User
    }>
{
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor
  ) {}

  async execute(recoverPassword: RecoverUserPasswordData): Promise<
    UseCaseReponse<{
      message: string
      user: User
    }>
  > {
    const response: User | undefined = await this.userRepository.findOneByEmail(
      recoverPassword.email
    )
    if (response === undefined)
      return {
        isSuccess: false,
        error: new EmailNotFoundError()
      }
    sendEmail(recoverPassword.email)
    return {
      isSuccess: true,
      data: {
        message: 'Usuario encontrado',
        user: response
      }
    }
  }
}
