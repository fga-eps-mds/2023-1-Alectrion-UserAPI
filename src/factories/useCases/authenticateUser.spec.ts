import UserRepository from '../../repository/userRepository';
import { BcryptAdapter } from '../../adapters/bcryptAdapter';
import { AuthenticateUserUseCase } from '../../useCase/authenticationUser/authenticationUserUseCase';
import { CreateToken } from '../../adapters/tokenAdapter';
import { makeAuthenticationUser } from './authenticateUser';

describe('makeAuthenticationUser', () => {
  it('should create an instance of AuthenticateUserUseCase', () => {

    const userRepository = new UserRepository();
    const encryptor = new BcryptAdapter();
    const token = new CreateToken();
    const authenticateUserUseCase = makeAuthenticationUser();

    expect(authenticateUserUseCase).toBeInstanceOf(AuthenticateUserUseCase);
    expect(authenticateUserUseCase['userRepository']).toStrictEqual(userRepository);
    expect(authenticateUserUseCase['encryptor']).toStrictEqual(encryptor);
    expect(authenticateUserUseCase['token']).toStrictEqual(token);
  });
});

