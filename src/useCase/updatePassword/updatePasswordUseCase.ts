import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

export interface UpdatePasswordData {
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

    if (passwordUpdate.password !== undefined) {
      const hashedPassword = this.encryptor.encrypt(passwordUpdate.password)
      await this.userRepository.updateOne({
        ...passwordUpdate,
        password: hashedPassword
      })
      return { isSuccess: true, data: { message: 'Senha atualizada!' } }
    } else {      
      return (await this.userRepository.updateOne({
        ...passwordUpdate,
      }))
        ? { isSuccess: true, data: { message: 'Senha atualizada!' } }
        : {
            isSuccess: false,
            error: new UpdatePasswordError()
          }
    }
  }
}
