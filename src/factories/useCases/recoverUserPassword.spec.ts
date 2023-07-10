import UserRepository from '../../repository/userRepository';
import { RecoverUserPasswordUseCase } from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase';
import { BcryptAdapter } from '../../adapters/bcryptAdapter';
import { MailerAdapter } from '../../adapters/mailerAdapter';
import { makeRecoverUserPassword } from './recoverUserPassword';

describe('makeRecoverUserPassword', () => {
  it('should create an instance of RecoverUserPasswordUseCase', () => {

    const userRepository = new UserRepository();
    const encryptor = new BcryptAdapter();
    const mailer = new MailerAdapter();
    const recoverUserPasswordUseCase = makeRecoverUserPassword();

    expect(recoverUserPasswordUseCase).toBeInstanceOf(RecoverUserPasswordUseCase);
    expect(recoverUserPasswordUseCase['userRepository']).toEqual(userRepository);
    expect(recoverUserPasswordUseCase['encryptor']).toEqual(encryptor);
    expect(recoverUserPasswordUseCase['mailer']).toEqual(mailer);
  });
});