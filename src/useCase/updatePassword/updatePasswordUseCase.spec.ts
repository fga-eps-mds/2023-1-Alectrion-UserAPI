import { UpdatePasswordUseCase, UpdatePasswordData, UpdatePasswordError } from './updatePasswordUseCase';
import { Repository } from '../../repository/protocol/repository';
import { Encryptor } from '../../services/encryptor';

describe('UpdatePasswordUseCase', () => {
  let userRepository: Repository;
  let encryptor: Encryptor;
  let updatePasswordUseCase: UpdatePasswordUseCase;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOne: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByUsername: jest.fn(),
      findOneByCpf: jest.fn(),
      findAll: jest.fn(),
      findToAuthenticate: jest.fn(),
    };

    encryptor = {
      compare: jest.fn(),
      encrypt: jest.fn(),
    };

    updatePasswordUseCase = new UpdatePasswordUseCase(userRepository, encryptor);
  });

  it('should update the password when all parameters are provided correctly', async () => {
    // Arrange
    const actualPassword = 'actualPassword';
    const newPassword = 'newPassword';
    const userId = 'userId';
    const email = 'user@example.com';

    const passwordUpdate: UpdatePasswordData = {
      actualPassword,
      userId,
      email,
      password: newPassword,
    };

    const user = {
      id: userId,
      email,
      password: 'hashedPassword', // Use a hashed password here
    };

    const hashedNewPassword = 'hashedNewPassword';

    const expectedResponse = { isSuccess: true, data: { message: 'Senha atualizada!' } };

    (userRepository.findToAuthenticate as jest.Mock).mockResolvedValue(user);
    (encryptor.compare as jest.Mock).mockReturnValue(true);
    (encryptor.encrypt as jest.Mock).mockReturnValue(hashedNewPassword);
    (userRepository.updateOne as jest.Mock).mockResolvedValue(true);

    // Act
    const response = await updatePasswordUseCase.execute(passwordUpdate);

    // Assert
    expect(userRepository.findToAuthenticate).toHaveBeenCalledWith(email);
    expect(encryptor.compare).toHaveBeenCalledWith(actualPassword, user.password);
    expect(encryptor.encrypt).toHaveBeenCalledWith(newPassword);
    expect(userRepository.updateOne).toHaveBeenCalledWith({
      userId,
      email,
      password: hashedNewPassword,
      temporarypassword: false,
    });
    expect(response).toEqual(expectedResponse);
  });

  // Resto do código de teste...
});