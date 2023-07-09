import UserRepository from '../../repository/userRepository';
import { GetUserUseCase } from '../../useCase/getUser/getUserUseCase';
import { makeGetUser } from './getUser';

describe('makeGetUser', () => {
  it('should create an instance of GetUserUseCase', () => {
    const userRepository = new UserRepository();
    const getUserUseCase = makeGetUser();

    expect(getUserUseCase).toBeInstanceOf(GetUserUseCase);
    expect(getUserUseCase['userRepository']).toStrictEqual(userRepository);
  });
});