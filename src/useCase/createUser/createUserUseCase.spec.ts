import {
  CreateUserData,
  CreateUserError,
  CreateUserUseCase,
  EmailNotSentError,
  PasswordNotProvidedError,
  UserAlreadyExistsError
} from './createUserUseCase'
import { MockProxy, mock } from 'jest-mock-extended'
import { Encryptor } from '../../services/encryptor'
import { MailerAdapter } from '../../adapters/mailerAdapter'
import { Repository } from '../../repository/protocol/repository'
import { datatype } from 'faker'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'

const mailer = mock<MailerAdapter>()

describe('Should test use case create user', () => {
  let sut: CreateUserUseCase
  let encryptor: MockProxy<Encryptor>
  let userRepository: MockProxy<Repository>

  const body: CreateUserData = {
    name: datatype.string(),
    email: `${datatype.string()}@t.com`,
    username: datatype.string(),
    cpf: datatype.string(),
    jobFunction: 'GENERICO',
    role: 'BASICO',
    password: datatype.string()
  }
  beforeEach(() => {
    userRepository = mock()
    encryptor = mock()
    sut = new CreateUserUseCase(encryptor, userRepository, mailer)
    userRepository.findOneByEmail.mockResolvedValue(undefined)
    userRepository.findOneByUsername.mockResolvedValue(undefined)
    userRepository.createUser.mockResolvedValue({
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      username: datatype.string(),
      password: 'any_password',
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.GENERICO,
      role: Role.ADMIN,
      cpf: datatype.string(),
      temporarypassword: false
    })
  })

  it('should call findUserByEmail with correct values', async () => {
    await sut.execute(body)

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(body.email)
    expect(userRepository.findOneByEmail).toBeCalledTimes(1)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    userRepository.findOneByEmail.mockResolvedValueOnce({
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      cpf: datatype.string(),
      username: datatype.string(),
      password: 'any_password',
      id: 'any_email',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.GENERICO,
      role: Role.ADMIN,
      temporarypassword: false
    })

    const result = await sut.execute(body)
    expect(result.data).toBeUndefined()
    expect(result.error).toEqual(
      new UserAlreadyExistsError('Email já utilizado')
    )
    expect(userRepository.findOneByUsername).toBeCalledTimes(0)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    userRepository.findOneByUsername.mockResolvedValueOnce({
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      cpf: datatype.string(),
      username: datatype.string(),
      password: 'any_password',
      id: 'any_email',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.GENERICO,
      role: Role.ADMIN,
      temporarypassword: false
    })

    const result = await sut.execute(body)

    expect(result.error).toEqual(
      new UserAlreadyExistsError('Username já utilizado')
    )
    expect(userRepository.findOneByUsername).toBeCalledTimes(1)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    await sut.execute(body)

    expect(encryptor.encrypt).toBeCalledTimes(1)
    expect(encryptor.encrypt).toBeCalledWith(body.password)
  })

  it('should return UserAlreadyExistsError if cpf already exists', async () => {
    userRepository.findOneByCpf.mockResolvedValueOnce({
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      cpf: datatype.string(),
      username: datatype.string(),
      password: 'any_password',
      id: 'any_email',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.GENERICO,
      role: Role.ADMIN,
      temporarypassword: false
    })
    const result = await sut.execute(body)

    const expectedResponse = {
      isSuccess: false,
      error: new UserAlreadyExistsError('Cpf já utilizado')
    }
    expect(result).toEqual(expectedResponse)
    expect(encryptor.encrypt).toBeCalledTimes(0)
  })

  it('should return CreateUserError if userRepository CreateUser returns undefined', async () => {
    userRepository.createUser.mockResolvedValue(undefined)
    const result = await sut.execute(body)

    expect(result.error).toEqual(new CreateUserError())
    expect(result.isSuccess).toBeFalsy()
    expect(result.data).toBeUndefined()
  })

  it('should return PasswordNotProvidedError if user is CONSULTA and password is not provided', async () => {
    const body: CreateUserData = {
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      username: datatype.string(),
      cpf: datatype.string(),
      jobFunction: 'GENERICO',
      role: 'CONSULTA'
    }
    const result = await sut.execute(body)
    const expectedResponse = {
      isSuccess: false,
      error: new PasswordNotProvidedError()
    }
    expect(result).toEqual(expectedResponse)
    expect(result.data).toBeUndefined()
  })

  test('Should return EmailNotSentError in not query user', async () => {
    mailer.sendRecoverPasswordEmail.mockResolvedValueOnce(false)
    const body: CreateUserData = {
      name: datatype.string(),
      email: `${datatype.string()}@t.com`,
      username: datatype.string(),
      cpf: datatype.string(),
      jobFunction: 'GENERICO',
      role: 'BASICO'
    }
    const result = await sut.execute(body)

    const expectedResponse = {
      isSuccess: false,
      error: new EmailNotSentError()
    }
    expect(result).toEqual(expectedResponse)
    expect(userRepository.updateOne).toBeCalledTimes(0)
    expect(mailer.sendRecoverPasswordEmail).toBeCalledTimes(1)
  })
})
