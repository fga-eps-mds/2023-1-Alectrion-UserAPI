import { mock } from 'jest-mock-extended'
import { Repository } from '../../repository/protocol/repository'
import {
  RecoverUserPasswordData,
  EmailNotFoundError,
  EmailNotSentError,
  PasswordNotUpdatedError,
  RecoverUserPasswordUseCase
} from './recoverUserPasswordUseCase'
import { Encryptor } from '../../services/encryptor'
import { MailService } from '../../services/mailer'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'

const repositoryMocked = mock<Repository>()
const encryptorMock = mock<Encryptor>()
const mailerMock = mock<MailService>()
const recoverPassUseCase = new RecoverUserPasswordUseCase(
  repositoryMocked,
  encryptorMock,
  mailerMock
)

const foundUser = {
  id: '039a1c58-3022-45a0-b390-b5655b1eb0qw5',
  name: 'carlos',
  email: 'carlos@gmail.com',
  username: 'carlao',
  job: Job.AGENTE_POLICIA,
  cpf: '1231',
  password: '1234',
  role: Role.BASICO,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
  temporarypassword: false,
  isDeleted: false
}

const recoverPassData: RecoverUserPasswordData = {
  email: foundUser.email
}

describe('Recover User Password Test', () => {
  test('Should recover password', async () => {
    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Email enviado com sucesso' }
    }
    repositoryMocked.findOneByEmail.mockResolvedValueOnce(foundUser)
    repositoryMocked.updateOne.mockResolvedValueOnce(true)
    mailerMock.sendRecoverPasswordEmail.mockResolvedValueOnce(true)

    const result = await recoverPassUseCase.execute(recoverPassData)

    expect(mailerMock.sendRecoverPasswordEmail).toBeCalledTimes(1)
    expect(encryptorMock.encrypt).toBeCalledTimes(1)
    expect(result).toEqual(expectedResponse)
  })

  test('Should return EmailNotFoundError', async () => {
    repositoryMocked.findOneByEmail.mockResolvedValueOnce(undefined)

    const result = await recoverPassUseCase.execute(recoverPassData)

    const expectedResponse = {
      isSuccess: false,
      error: new EmailNotFoundError()
    }

    expect(result).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toBeCalledTimes(0)
    expect(mailerMock.sendRecoverPasswordEmail).toBeCalledTimes(0)
    expect(encryptorMock.encrypt).toBeCalledTimes(0)
  })

  test('Should return EmailNotSentError', async () => {
    repositoryMocked.findOneByEmail.mockResolvedValueOnce(foundUser)
    mailerMock.sendRecoverPasswordEmail.mockResolvedValueOnce(false)

    const result = await recoverPassUseCase.execute(recoverPassData)

    const expectedResponse = {
      isSuccess: false,
      error: new EmailNotSentError()
    }

    expect(result).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toBeCalledTimes(0)
    expect(mailerMock.sendRecoverPasswordEmail).toBeCalledTimes(1)
    expect(encryptorMock.encrypt).toBeCalledTimes(1)
  })

  test('Should return PasswordNotUpdatedError', async () => {
    repositoryMocked.findOneByEmail.mockResolvedValueOnce(foundUser)
    repositoryMocked.updateOne.mockResolvedValueOnce(false)
    mailerMock.sendRecoverPasswordEmail.mockResolvedValueOnce(true)

    const result = await recoverPassUseCase.execute(recoverPassData)

    const expectedResponse = {
      isSuccess: false,
      error: new PasswordNotUpdatedError()
    }

    expect(result).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toBeCalledTimes(1)
    expect(mailerMock.sendRecoverPasswordEmail).toBeCalledTimes(1)
    expect(encryptorMock.encrypt).toBeCalledTimes(1)
  })
})
