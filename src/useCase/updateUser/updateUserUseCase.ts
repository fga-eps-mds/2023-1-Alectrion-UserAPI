import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

export interface UpdateUserData {
  userId: string
  name?: string
  email?: string
  username?: string
  jobFunction?: string
  role?: string
  password?: string
  temporaryPassword?: boolean
}

export class UpdateUserError extends Error {
  constructor() {
    super('Não foi possivel atualizar o usuário.')
    this.name = 'UpdateUserError'
  }
}

export class UpdateUserUseCase implements UseCase<{ message: string }> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor
  ) {}

  async execute(
    userUpdate: UpdateUserData
  ): Promise<UseCaseReponse<{ message: string }>> {
    if (userUpdate.password !== undefined) {
      const hashedPassword = this.encryptor.encrypt(userUpdate.password)
      await this.userRepository.updateOne({
        ...userUpdate,
        password: hashedPassword
      })
      return { isSuccess: true, data: { message: 'Usuário atualizado!' } }
    } else {
      return (await this.userRepository.updateOne({
        ...userUpdate
      }))
        ? { isSuccess: true, data: { message: 'Usuário atualizado!' } }
        : {
            isSuccess: false,
            error: new UpdateUserError()
          }
    }
  }
}
