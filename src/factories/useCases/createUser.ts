import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import UserRepository from '../../repository/userRepository'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'
import { MailerAdapter } from '../../adapters/mailerAdapter'

export const makeCreateUser = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  const mailer = new MailerAdapter()
  return new CreateUserUseCase(encryptor, userRepository, mailer)
}
