import { BcryptAdapter } from "../../adapters/bcryptAdapter";
import { MailerAdapter } from "../../adapters/mailerAdapter";
import UserRepository from "../../repository/userRepository";
import { CreateUserUseCase } from "../../useCase/createUser/createUserUseCase";
import { makeCreateUser } from "./createUser";

describe('makeCreateUser', () => {
  it('should create an instance of CreateUserUseCase', () => {

    const encryptor = new BcryptAdapter();
    const userRepository = new UserRepository();
    const mailer = new MailerAdapter();
    const createUserUseCase = makeCreateUser();

    expect(createUserUseCase).toBeInstanceOf(CreateUserUseCase);
    expect(createUserUseCase['encryptor']).toStrictEqual(encryptor);
    expect(createUserUseCase['userRepository']).toStrictEqual(userRepository);
    expect(createUserUseCase['mailer']).toStrictEqual(mailer);
  });
});