import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { Token } from '../../services/tokenGenerator'
import { mock } from 'jest-mock-extended'
import { datatype } from 'faker'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'
import { User } from '../../domain/entities/user'
import {
  AuthenticateUserUseCase,
  LoginPasswordError,
  LoginUsernameError
} from './authenticationUserUseCase'

const mockedRepository = mock<Repository>()
const mockedEncryptor = mock<Encryptor>()
const mockedToken = mock<Token>()

const mockedUser: User = {
  id: datatype.string(),
  name: datatype.string(),
  email: datatype.string(),
  username: datatype.string(),
  cpf: datatype.string(),
  job: Job.DELEGADO,
  role: Role.ADMIN,
  password: datatype.string(),
  createdAt: new Date(),
  updatedAt: new Date(),
  temporarypassword: false
}

const authenticateUserUseCase = new AuthenticateUserUseCase(
  mockedRepository,
  mockedEncryptor,
  mockedToken
)
describe('Authentication use case', () => {
  it('should authenticate with success ', async () => {
    const mockedGenerateToken = datatype.string()
    mockedRepository.findToAuthenticate.mockResolvedValue(mockedUser)
    mockedEncryptor.compare.mockReturnValue(true)
    mockedToken.generateToken.mockReturnValue(mockedGenerateToken)
    const authenticationInput = {
      identifier: datatype.string(),
      password: datatype.string()
    }
    const response = await authenticateUserUseCase.execute(authenticationInput)
    const expireIn = process.env.TIME_TOKEN || '3600s'

    const useCaseExpectedResponse = {
      isSuccess: true,
      data: {
        token: mockedGenerateToken,
        expireIn,
        email: mockedUser.email,
        name: mockedUser.name,
        role: mockedUser.role,
        job: mockedUser.job,
        cpf: mockedUser.cpf,
        id: mockedUser.id,
        temporaryPassword: mockedUser.temporarypassword
      }
    }

    expect(response).toEqual(useCaseExpectedResponse)
  })

  it('should return an error - username not present in DB', async () => {
    const mockedGenerateToken = datatype.string()
    mockedRepository.findToAuthenticate.mockResolvedValue(null)
    mockedEncryptor.compare.mockReturnValue(true)
    mockedToken.generateToken.mockReturnValue(mockedGenerateToken)
    const authenticationInput = {
      identifier: datatype.string(),
      password: datatype.string()
    }
    const response = await authenticateUserUseCase.execute(authenticationInput)
    const useCaseExpectedResponse = {
      isSuccess: false,
      error: 'Seu usuário não pôde ser encontrado'
    }
    expect(response.isSuccess).toEqual(useCaseExpectedResponse.isSuccess)
    expect(response.error).toEqual(new LoginUsernameError())
  })

  it('should return an error - password is incorrect', async () => {
    const mockedGenerateToken = datatype.string()
    mockedRepository.findToAuthenticate.mockResolvedValue(mockedUser)
    mockedEncryptor.compare.mockReturnValue(false)
    mockedToken.generateToken.mockReturnValue(mockedGenerateToken)
    const authenticationInput = {
      identifier: datatype.string(),
      password: datatype.string()
    }
    const response = await authenticateUserUseCase.execute(authenticationInput)
    const useCaseExpectedResponse = {
      isSuccess: false,
      error: 'Senha incorreta'
    }
    expect(response.isSuccess).toEqual(useCaseExpectedResponse.isSuccess)
    expect(response.error).toEqual(new LoginPasswordError())
  })

  it('should authenticate with email and return success ', async () => {
    const mockedGenerateToken = datatype.string()
    mockedRepository.findToAuthenticate.mockResolvedValue(mockedUser)
    mockedEncryptor.compare.mockReturnValue(true)
    mockedToken.generateToken.mockReturnValue(mockedGenerateToken)
    const authenticationInput = {
      identifier: mockedUser.email,
      password: mockedUser.password
    }
    const response = await authenticateUserUseCase.execute(authenticationInput)

    const useCaseExpectedResponse = {
      isSuccess: true,
      data: {
        token: mockedGenerateToken,
        expireIn: '3600s',
        email: mockedUser.email,
        name: mockedUser.name,
        role: mockedUser.role,
        job: mockedUser.job,
        cpf: mockedUser.cpf,
        id: mockedUser.id,
        temporaryPassword: mockedUser.temporarypassword
      }
    }

    expect(response).toEqual(useCaseExpectedResponse)
  })

  it('should authenticate with cpf and return success ', async () => {
    const mockedGenerateToken = datatype.string()
    mockedRepository.findToAuthenticate.mockResolvedValue(mockedUser)
    mockedEncryptor.compare.mockReturnValue(true)
    mockedToken.generateToken.mockReturnValue(mockedGenerateToken)
    const authenticationInput = {
      identifier: mockedUser.cpf,
      password: mockedUser.password
    }
    const response = await authenticateUserUseCase.execute(authenticationInput)

    const useCaseExpectedResponse = {
      isSuccess: true,
      data: {
        token: mockedGenerateToken,
        expireIn: '3600s',
        email: mockedUser.email,
        name: mockedUser.name,
        role: mockedUser.role,
        job: mockedUser.job,
        cpf: mockedUser.cpf,
        id: mockedUser.id,
        temporaryPassword: mockedUser.temporarypassword
      }
    }

    expect(response).toEqual(useCaseExpectedResponse)
  })
})
