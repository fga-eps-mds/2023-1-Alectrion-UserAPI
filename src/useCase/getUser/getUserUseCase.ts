import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { User } from '../../domain/entities/user'

export class GetUserError extends Error {
  constructor() {
    super('Não foi possivel encontrar o usuário!')
    this.name = 'GetUserError'
  }
}

export interface FindUserInput {
  password?: string
  userName?: string
  email?: string
  userId?: string
  allUsers?: boolean
}
export interface Users {}

export class GetUserUseCase implements UseCase<User[]> {
  constructor(private readonly userRepository: Repository) {}
  async execute(userData: FindUserInput): Promise<UseCaseReponse<User[]>> {
    let userFound = null

    if (userData.userName) {
      userFound = await this.userRepository.findOneByUsername(userData.userName)
    } else if (userData.email) {
      userFound = await this.userRepository.findOneByEmail(userData.email)
    } else if (userData.userId) {
      userFound = await this.userRepository.findOne(userData.userId)
    } else if (userData.allUsers) {
      userFound = await this.userRepository.findAll()
    } else {
      return {
        isSuccess: false,
        error: new GetUserError()
      }
    }
    if (userFound) {
      const returnedValue = (
        userFound instanceof Array ? userFound : [userFound]
      ) as User[]
      return { isSuccess: true, data: returnedValue }
    }
    return {
      isSuccess: false,
      error: new GetUserError()
    }
  }
}
