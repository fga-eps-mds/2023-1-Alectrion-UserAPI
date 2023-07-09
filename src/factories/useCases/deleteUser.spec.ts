import UserRepository from '../../repository/userRepository';
import { DeleteUserUseCase } from '../../useCase/deleteUser/deleteUserUseCase';
import { makeDeleteUser } from './deleteUser';

describe('makeDeleteUser', () => {
  it('should create an instance of DeleteUserUseCase', () => {

    const userRepository = new UserRepository();
    const deleteUserUseCase = makeDeleteUser();

    expect(deleteUserUseCase).toBeInstanceOf(DeleteUserUseCase);
    expect(deleteUserUseCase['userRepository']).toStrictEqual(userRepository);
  });
});







