import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'
import { MailerAdapter } from '../../adapters/mailerAdapter'
import crypto from 'crypto'

export interface CreateUserData {
  name: string
  email: string
  username: string
  cpf: string
  jobFunction:
    | 'DELEGADO'
    | 'AGENTE_POLICIA'
    | 'ESCRIVAO'
    | 'COORDENADOR'
    | 'CHEFE_SECAO'
    | 'GENERICO'
    | 'COMISSIONADO'
    | 'ESTAGIARIO'
    | 'SUPERINTENDENTE'
  role: 'ADMIN' | 'GERENTE' | 'BASICO' | 'CONSULTA'
  password?: string
}

export class UserAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserAlreadyExists'
  }
}

export class CreateUserError extends Error {
  constructor() {
    super('Não foi possível criar o usuário')
    this.name = 'CreateUserError'
  }
}

export class EmailNotSentError extends Error {
  constructor() {
    super('Não foi possível enviar o e-mail.')
    this.name = 'EmailNotSentError'
  }
}

export class PasswordNotProvidedError extends Error {
  constructor() {
    super('Usuário de consulta precisa de senha.')
    this.name = 'PasswordNotProvidedError'
  }
}

export class CreateUserUseCase
  implements UseCase<{ email: string; job: string }>
{
  constructor(
    private readonly encryptor: Encryptor,
    private readonly userRepository: Repository,
    private readonly mailer: MailerAdapter
  ) {}

  async execute(
    createUserData: CreateUserData
  ): Promise<UseCaseReponse<{ email: string; job: string }>> {
    if (createUserData.email) {
      const userByEmail = await this.userRepository.findOneByEmail(
        createUserData.email
      )
      if (userByEmail !== undefined) {
        return {
          isSuccess: false,
          error: new UserAlreadyExistsError('Email já utilizado')
        }
      }
    }

    const userByUsername = await this.userRepository.findOneByUsername(
      createUserData.username
    )
    if (userByUsername !== undefined) {
      return {
        isSuccess: false,
        error: new UserAlreadyExistsError('Username já utilizado')
      }
    }

    const userByCpf = await this.userRepository.findOneByCpf(createUserData.cpf)
    if (userByCpf !== undefined) {
      return {
        isSuccess: false,
        error: new UserAlreadyExistsError('Cpf já utilizado')
      }
    }

    let userPassword
    if (createUserData.password) {
      userPassword = createUserData.password
    } else {
      if (createUserData.role === 'CONSULTA')
        return {
          isSuccess: false,
          error: new PasswordNotProvidedError()
        }
      userPassword = crypto.randomBytes(4).toString('hex')
      const sent = await this.mailer.sendRecoverPasswordEmail(
        createUserData.email,
        userPassword
      )
      if (!sent)
        return {
          isSuccess: false,
          error: new EmailNotSentError()
        }
    }

    const hashedPassword = this.encryptor.encrypt(userPassword)

    const user = await this.userRepository.createUser({
      name: createUserData.name,
      password: hashedPassword,
      email: createUserData.email,
      cpf: createUserData.cpf,
      username: createUserData.username,
      job: Job[createUserData.jobFunction],
      role: Role[createUserData.role],
      temporaryPassword: createUserData.role !== 'CONSULTA'
    })

    if (user !== undefined) {
      return { isSuccess: true, data: { email: user.email, job: user.job } }
    } else {
      return {
        isSuccess: false,
        error: new CreateUserError()
      }
    }
  }
}
