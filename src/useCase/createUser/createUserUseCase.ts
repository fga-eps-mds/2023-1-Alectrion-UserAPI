import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../infrastructure/service/encrypte.service'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'

export interface CreateUserData {
  name: string
  email: string
  username: string
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
  password: string
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

export class CreateUserUseCase
  implements UseCase<{ email: string; job: string }>
{
  constructor(
    private readonly encryptor: Encryptor,
    private readonly userRepository: Repository
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
          error: new UserAlreadyExistsError('email já utilizado')
        }
      }
    }

    const userByUsername = await this.userRepository.findOneByUsername(
      createUserData.username
    )
    if (userByUsername !== undefined) {
      return {
        isSuccess: false,
        error: new UserAlreadyExistsError('username já utilizado')
      }
    }
    const hashedPassword = this.encryptor.encrypt(createUserData.password)

    const user = await this.userRepository.createUser({
      name: createUserData.name,
      password: hashedPassword,
      email: createUserData.email,
      username: createUserData.username,
      job: Job[createUserData.jobFunction],
      role: Role[createUserData.role]
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
