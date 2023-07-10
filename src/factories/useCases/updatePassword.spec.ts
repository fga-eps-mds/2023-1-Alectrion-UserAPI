import { BcryptAdapter } from '../../adapters/bcryptAdapter';
import UserRepository from '../../repository/userRepository';
import { UpdatePasswordUseCase } from '../../useCase/updatePassword/updatePasswordUseCase';
import { makeUpdateUser } from './updatePassword';

describe('makeUpdateUser', () => {
  it('should create an instance of UpdatePasswordUseCase', () => {

    const userRepository = new UserRepository();
    const encryptor = new BcryptAdapter();
    const updatePasswordUseCase = makeUpdateUser();

    expect(updatePasswordUseCase).toBeInstanceOf(UpdatePasswordUseCase);
    expect(updatePasswordUseCase['userRepository']).toEqual(userRepository);
    expect(updatePasswordUseCase['encryptor']).toEqual(encryptor);
  });
});