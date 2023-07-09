import { BcryptAdapter } from '../../adapters/bcryptAdapter';
import UserRepository from '../../repository/userRepository';
import { UpdateUserUseCase } from '../../useCase/updateUser/updateUserUseCase';
import { makeUpdateUser } from './updateUser';

describe('makeUpdateUser', () => {
  it('should create an instance of UpdateUserUseCase', () => {
    const userRepository = new UserRepository();
    const encryptor = new BcryptAdapter();
    const updateUserUseCase = makeUpdateUser();

    expect(updateUserUseCase).toBeInstanceOf(UpdateUserUseCase);
    expect(updateUserUseCase['userRepository']).toEqual(userRepository);
    expect(updateUserUseCase['encryptor']).toEqual(encryptor);
  });
});