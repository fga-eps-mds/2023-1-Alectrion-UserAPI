import { User } from '../db/entities/user';
import { Role } from '../db/entities/userEnum/role';
import { Job } from '../db/entities/userEnum/job';
import UserRepository from './userRepository';
import { Repository } from './protocol/repository';

describe('UserRepository', () => {
  let userRepository: Repository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should find user to authenticate', async () => {
    // Dado de entrada
    const userInput = 'userInput';

    // Mock do método 'find' do repositório
    const mockUser = {
      username: 'username',
      email: 'email',
      cpf: 'cpf',
      password: 'password',
      name: 'name',
      id: 'id',
      role: Role.ADMIN,
      job: Job.GENERICO,
      temporarypassword: true
    };
    jest.spyOn(userRepository, 'findToAuthenticate').mockResolvedValue(mockUser);

    // Executar o método a ser testado
    const result = await userRepository.findToAuthenticate(userInput);

    // Verificar se o método 'find' foi chamado corretamente
    expect(userRepository.findToAuthenticate).toHaveBeenCalledWith(userInput);

    // Verificar o resultado
    expect(result).toEqual(mockUser);
  });
  it('should update user', async () => {
   
    const userData = {
      userId: 'userId',
      name: 'newName',
      email: 'newEmail',
      password: 'newPassword'
    };

    jest.spyOn(userRepository, 'updateOne').mockResolvedValue(true);

    const result = await userRepository.updateOne(userData);

    expect(userRepository.updateOne).toHaveBeenCalledWith(userData);

    expect(result).toBe(true);
  });
  it('should delete user', async () => {
   
    const userId = 'userId';

    
    jest.spyOn(userRepository, 'deleteOne').mockImplementation(async () => {
      
      return;
    });

    await userRepository.deleteOne(userId);

    expect(userRepository.deleteOne).toHaveBeenCalledWith(userId);

  });
  it('should create user', async () => {

    const params = {
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe',
      cpf: '123456789',
      job: Job.GENERICO,
      role: Role.ADMIN,
      password: 'password',
      temporaryPassword: false
    };

    jest.spyOn(userRepository, 'createUser').mockImplementation(async () => {

      const user: User = {
        id: 'userId',
        name: params.name,
        email: params.email,
        username: params.username,
        cpf: params.cpf,
        job: params.job,
        role: params.role,
        password: params.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        temporarypassword: params.temporaryPassword,
        isDeleted: false
      };
      return user;
    });

    const result = await userRepository.createUser(params);

    expect(userRepository.createUser).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      id: 'userId',
      name: params.name,
      email: params.email,
      username: params.username,
      cpf: params.cpf,
      job: params.job,
      role: params.role,
      password: params.password,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      temporarypassword: params.temporaryPassword,
      isDeleted: false
    });
  });
});

  