import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

export interface UpdatePasswordData {
  actualPassword?: string
  userId?: string
  email?: string
  username?: string
  password?: string
}

export class UpdatePasswordError extends Error {
  constructor() {
    super('Não foi possivel atualizar a senha.')
    this.name = 'UpdatePasswordError'
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super('Senha incorreta.')
    this.name = 'IncorrectPasswordError'
  }
}

export class LackingInformationError extends Error {
  constructor() {
    super('Você precisa fornecer id, senha atual e nova senha.')
    this.name = 'LackingInformationError'
  }
}

export class UpdatePasswordUseCase implements UseCase<{ message: string }> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor
  ) {}

  async execute(
    passwordUpdate: UpdatePasswordData
  ): Promise<UseCaseReponse<{ message: string }>> {
    try {
      if (
        typeof passwordUpdate.email !== 'undefined' &&
        typeof passwordUpdate.actualPassword !== 'undefined' &&
        typeof passwordUpdate.password !== 'undefined'
      ) {
        const user = await this.userRepository.findToAuthenticate(
          passwordUpdate.email
        )

        const checkPassword = this.encryptor.compare(
          passwordUpdate.actualPassword,
          user?.password || ''
        )
        if (checkPassword) {
          const hashedPassword = this.encryptor.encrypt(passwordUpdate.password)

          const { actualPassword, ...rest } = passwordUpdate

          const result = await this.userRepository.updateOne({
            ...rest,
            password: hashedPassword,
            temporarypassword: false
          })
          if (result)
            return { isSuccess: true, data: { message: 'Senha atualizada!' } }
          else {
            return {
              isSuccess: false,
              error: new UpdatePasswordError()
            }
          }
        } else {
          return {
            isSuccess: false,
            error: new IncorrectPasswordError()
          }
        }
      } else {
        return {
          isSuccess: false,
          error: new LackingInformationError()
        }
      }
    } catch (error) {
      return {
        isSuccess: false,
        error: new UpdatePasswordError()
      }
    }
  }
}
