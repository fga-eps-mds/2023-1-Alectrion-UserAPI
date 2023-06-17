import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

export interface RecoverUserPasswordData {
  email?: string
}

export class EmailNotFoundError extends Error {
  constructor() {
    super('Não foi possivel encontrar o e-mail informado.')
    this.name = 'EmailNotFoundError'
  }
}

export class RecoverUserPasswordUseCase
  implements UseCase<{ message: string }>
{
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor
  ) {}

  async execute(
    recoverPassword: RecoverUserPasswordData
  ): Promise<UseCaseReponse<{ message: string }>> {
      const response = await this.userRepository.findOneByEmail(
        recoverPassword.email?
      )
      if (response === undefined)
        return {
          isSuccess: false,
          error: new EmailNotFoundError()
        }
     else {
      return (await this.userRepository.updateOne({
        ...recoverPassword
      }))
        ? { isSuccess: true, data: { message: 'Usuário atualizado!' } }
        : {
            isSuccess: false,
            error: new EmailNotFoundError()
          }
    }
  }
}
