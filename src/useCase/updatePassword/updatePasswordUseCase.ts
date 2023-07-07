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
          passwordUpdate?.email
        )

        const checkPassword = this.encryptor.compare(
          passwordUpdate.actualPassword || '',
          user?.password || ''
        )
        if (checkPassword) {
          const hashedPassword = this.encryptor.encrypt(passwordUpdate.password)

          const { actualPassword, ...rest } = passwordUpdate

          await this.userRepository.updateOne({
            ...rest,
            password: hashedPassword,
            temporarypassword: false
          })
          return { isSuccess: true, data: { message: 'Senha atualizada!' } }
        } else {
          return {
            isSuccess: false,
            data: { message: 'Senha atual não corresponde!' }
          }
        }
      } else {
        return { isSuccess: false, data: { message: 'Id não existente!' } }
      }
    } catch (error) {
      return {
        isSuccess: false,
        data: { message: 'Não foi possível alterar a senha!' }
      }
    }
  }
}
