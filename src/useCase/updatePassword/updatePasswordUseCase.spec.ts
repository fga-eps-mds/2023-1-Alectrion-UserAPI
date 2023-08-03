import {
  UpdatePasswordUseCase,
  UpdatePasswordData,
  UpdatePasswordError,
  LackingInformationError,
  IncorrectPasswordError
} from './updatePasswordUseCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

describe('UpdatePasswordUseCase', () => {
  let userRepository: Repository
  let encryptor: Encryptor
  let updatePasswordUseCase: UpdatePasswordUseCase
  let request: UpdatePasswordData

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
      findToAuthenticate: jest.fn()
    }

    encryptor = {
      compare: jest.fn(),
      encrypt: jest.fn()
    }
    request = {
      actualPassword: 'actualPassword',
      password: 'newPassword',
      userId: 'userId',
      email: 'user@example.com'
    }
    updatePasswordUseCase = new UpdatePasswordUseCase(userRepository, encryptor)
  })

  it('should update the password when all parameters are provided correctly', async () => {
    const user = {
      id: request.userId,
      email: request.email,
      password: 'hashedPassword'
    }

    const hashedNewPassword = 'hashedNewPassword'

    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Senha atualizada!' }
    }

    ;(userRepository.findToAuthenticate as jest.Mock).mockResolvedValue(user)
    ;(encryptor.compare as jest.Mock).mockReturnValue(true)
    ;(encryptor.encrypt as jest.Mock).mockReturnValue(hashedNewPassword)
    ;(userRepository.updateOne as jest.Mock).mockResolvedValue(true)

    const response = await updatePasswordUseCase.execute(request)

    expect(userRepository.findToAuthenticate).toHaveBeenCalledWith(
      request.email
    )
    expect(encryptor.compare).toHaveBeenCalledWith(
      request.actualPassword,
      user.password
    )
    expect(encryptor.encrypt).toHaveBeenCalledWith(request.password)
    expect(userRepository.updateOne).toHaveBeenCalledWith({
      userId: request.userId,
      email: request.email,
      password: hashedNewPassword,
      temporarypassword: false
    })
    expect(response).toEqual(expectedResponse)
  })

  it('should return lacking information error', async () => {
    request.email = undefined

    const expectedResponse = {
      isSuccess: false,
      error: new LackingInformationError()
    }

    const response = await updatePasswordUseCase.execute(request)

    expect(userRepository.findToAuthenticate).toHaveBeenCalledTimes(0)
    expect(encryptor.compare).not.toBeCalled()
    expect(encryptor.encrypt).not.toBeCalled()
    expect(response).toEqual(expectedResponse)
  })

  it('should return incorrect password', async () => {
    const user = {
      id: request.userId,
      email: request.email,
      password: 'hashedPassword'
    }

    const expectedResponse = {
      isSuccess: false,
      error: new IncorrectPasswordError()
    }

    ;(userRepository.findToAuthenticate as jest.Mock).mockResolvedValue(user)
    ;(encryptor.compare as jest.Mock).mockReturnValue(false)

    const response = await updatePasswordUseCase.execute(request)

    expect(userRepository.findToAuthenticate).toHaveBeenCalledTimes(1)
    expect(encryptor.compare).toBeCalledWith(
      request.actualPassword,
      user.password
    )
    expect(encryptor.encrypt).not.toBeCalled()
    expect(response).toEqual(expectedResponse)
  })

  it('should return update password error', async () => {
    const user = {
      id: request.userId,
      email: request.email,
      password: 'hashedPassword'
    }

    const hashedNewPassword = 'hashedNewPassword'

    const expectedResponse = {
      isSuccess: false,
      error: new UpdatePasswordError()
    }

    ;(userRepository.findToAuthenticate as jest.Mock).mockResolvedValue(user)
    ;(encryptor.compare as jest.Mock).mockReturnValue(true)
    ;(encryptor.encrypt as jest.Mock).mockReturnValue(hashedNewPassword)
    ;(userRepository.updateOne as jest.Mock).mockReturnValue(false)

    const response = await updatePasswordUseCase.execute(request)

    expect(userRepository.findToAuthenticate).toHaveBeenCalledWith(
      request.email
    )
    expect(encryptor.compare).toHaveBeenCalledWith(
      request.actualPassword,
      user.password
    )
    expect(encryptor.encrypt).toHaveBeenCalledWith(request.password)
    expect(userRepository.updateOne).toHaveBeenCalledWith({
      userId: request.userId,
      email: request.email,
      password: hashedNewPassword,
      temporarypassword: false
    })
    expect(response).toEqual(expectedResponse)
  })
})
