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
    super('Não foi possível encontrar o e-mail informado.')
    this.name = 'EmailNotFoundError'
  }
}

export class EmailNotSentError extends Error {
  constructor() {
    super('Não foi possível enviar o e-mail de recuperação de senha.')
    this.name = 'EmailNotSentError'
  }
}

export class PasswordNotUpdatedError extends Error {
  constructor() {
    super('Não foi possível alterar a senha do usuário.')
    this.name = 'PasswordNotUpdatedError'
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
    const result = await this.mailer.sendRecoverPasswordEmail(
      recoverPassword.email,
      temporaryPassword
    )

    if (result) {
      const isUpdated = await this.userRepository.updateOne({
        userId: response.id,
        password: hashedPassword,
        temporarypassword: true
      })

      if (!isUpdated) {
        return {
          isSuccess: false,
          error: new PasswordNotUpdatedError()
        }
      }
    } else {
      return {
        isSuccess: false,
        error: new EmailNotSentError()
      }
    }

    return {
      isSuccess: true,
      data: {
        message: 'Email enviado com sucesso'
      }
    }
  }
}
