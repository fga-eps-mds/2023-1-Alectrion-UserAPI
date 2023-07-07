import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { Token } from '../../services/tokenGenerator'

export class LoginUsernameError extends Error {
  constructor() {
    super('Seu usuário não pôde ser encontrado')
    this.name = 'LoginUsernameError'
  }
}

export class LoginPasswordError extends Error {
  constructor() {
    super('Senha incorreta')
    this.name = 'LoginPasswordError'
  }
}

export interface DataUserResponse {
  token: string
  expireIn: string
  email: string
  name: string
  role: string
  job: string
  cpf: string
  id?: string
  temporaryPassword: boolean
}
export interface DataUserLogin {
  identifier: string
  password: string
}

export class AuthenticateUserUseCase implements UseCase<DataUserResponse> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor,
    private readonly token: Token
  ) {}

  async execute(
    userData: DataUserLogin
  ): Promise<UseCaseReponse<DataUserResponse>> {
    let userFound = null
    userFound = await this.userRepository.findToAuthenticate(
      userData.identifier
    )

    if (!userFound) {
      return { isSuccess: false, error: new LoginUsernameError() }
    }

    const checkPassword = this.encryptor.compare(
      userData.password,
      userFound.password
    )

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginPasswordError() }
    }
    const timeTokenExpire = process.env.TIME_TOKEN || '3600s'
    const tokenRequested = this.token.generateToken(
      { userId: userFound.id, role: userFound.role },
      process.env.SECRET_JWT,
      {
        expiresIn: timeTokenExpire
      }
    )

    return {
      isSuccess: true,
      data: {
        token: tokenRequested,
        expireIn: timeTokenExpire,
        email: userFound.email,
        name: userFound.name,
        role: userFound.role,
        job: userFound.job,
        cpf: userFound.cpf,
        id: userFound.id,
        temporaryPassword: userFound.temporarypassword
      }
    }
  }
}
