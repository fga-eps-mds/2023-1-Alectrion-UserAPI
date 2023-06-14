import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { EncrypteService } from '../../infrastructure/service/encrypte.service'
import { TokenService } from '../../infrastructure/service/token.service'

export class LoginUsernameError extends Error {
  constructor() {
    super('username nao existente no banco!')
    this.name = 'LoginUsernameError'
  }
}

export class LoginPasswordError extends Error {
  constructor() {
    super('senha incorreta no banco!')
    this.name = 'LoginPasswordError'
  }
}

export interface DataUserLogin {
  username: string
  password: string
}

export class AuthenticateUserUseCase
  implements
    UseCase<{
      token: string
      expireIn: string
      email: string
      name: string
      role: string
      job: string
    }>
{
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: EncrypteService,
    private readonly token: TokenService
  ) {}

  async execute(userData: DataUserLogin): Promise<
    UseCaseReponse<{
      token: string
      expireIn: string
      email: string
      name: string
      role: string
      job: string
    }>
  > {
    let userFound = null
    userFound = await this.userRepository.findToAuthenticate(userData.username)

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
    const tokenRequested = this.token.generateToken(userFound.id ?? '')

    return {
      isSuccess: true,
      data: {
        token: tokenRequested,
        expireIn: timeTokenExpire,
        email: userFound.email,
        name: userFound.name,
        role: userFound.role,
        job: userFound.job
      }
    }
  }
}
