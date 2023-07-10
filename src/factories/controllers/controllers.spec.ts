
import { AuthenticationUserController } from '../../presentation/controller/authenticateUserController';
import { CreateUserController } from '../../presentation/controller/createUserController';
import { GetUserController } from '../../presentation/controller/getUserController';
import { RecoverUserPasswordController } from '../../presentation/controller/recoverUserPasswordController';
import { makeAuthenticateUserController } from './authenticateUser';
import { makeCreateUserController } from './createUser';
import { makeDeleteUserController } from './deleteUser';
import { makeGetUserController } from './getUser';
import { makeRecoverUserPasswordController } from './recoverUserPassword';
import { makeUpdatePasswordController } from './updatePassword';
import { makeUpdateUserController } from './updateUser';

describe('makeAuthenticateUserController', () => {
  it('should create an instance of AuthenticationUserController', () => {

    const authenticateUserController = makeAuthenticateUserController();
    expect(authenticateUserController).toBeInstanceOf(AuthenticationUserController);
  });

  it('should create an instance of CreateUserController', () => {

    const createUserController = makeCreateUserController();
    expect(createUserController).toBeInstanceOf(CreateUserController);
  });

  it('should create an instance of DeleteUserController', () => {
    
    const deleteUserController = makeDeleteUserController();
    expect(deleteUserController).toEqual(deleteUserController);
  });

  it('should create an instance of GetUserController', () => {

    const getUserController = makeGetUserController();
    expect(getUserController).toBeInstanceOf(GetUserController);
  });

  it('should create an instance of RecoverUserPasswordController', () => {

    const recoverUserPasswordController = makeRecoverUserPasswordController();
    expect(recoverUserPasswordController).toBeInstanceOf(RecoverUserPasswordController);
  });

  it('should create an instance of UpdatePasswordController', () => {

    const updatePasswordController = makeUpdatePasswordController();
    expect(updatePasswordController).toEqual(updatePasswordController);
  });

  it('should create an instance of UpdateUserController', () => {

    const updateUserController = makeUpdateUserController();
    expect(updateUserController).toEqual(updateUserController);
  });
});