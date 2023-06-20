import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { User } from '../../db/entities/user'
import { MailService } from '../../services/mailer'
import crypto from 'crypto'

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
    }>
{
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor,
    private readonly mailer: MailService
  ) {}

  async execute(recoverPassword: RecoverUserPasswordData): Promise<
    UseCaseReponse<{
      message: string
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
    const temporaryPassword = crypto.randomBytes(4).toString('hex')
    const hashedPassword = this.encryptor.encrypt(temporaryPassword)
    if (
      await this.mailer.sendRecoverPasswordEmail(
        recoverPassword.email,
        temporaryPassword
      )
    ) {
      await this.userRepository.updateOne({
        userId: response.id,
        password: hashedPassword,
        temporaryPassword: true
      })
    }
    return {
      isSuccess: true,
      data: {
        message: 'Email enviado com sucesso'
      }
    }
  }
}
