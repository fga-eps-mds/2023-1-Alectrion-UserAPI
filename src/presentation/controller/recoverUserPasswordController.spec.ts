import { mock } from 'jest-mock-extended'
import { RecoverUserPasswordController } from './recoverUserPasswordController'
import {
  EmailNotFoundError,
  EmailNotSentError,
  PasswordNotUpdatedError,
  RecoverUserPasswordUseCase
} from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase'
import { ServerError } from '../errors'

const recoverPassUseCaseMocked = mock<RecoverUserPasswordUseCase>()
const recoverPassControllerMocked = new RecoverUserPasswordController(
  recoverPassUseCaseMocked
)
const request = {
  email: 'teste@kmail.com'
}

describe('RecoverUserPasswordController Test', () => {
  test('Should recover password', async () => {
    const useCaseReponseMock = {
      isSuccess: true,
      data: { message: 'Email enviado com sucesso' }
    }

    recoverPassUseCaseMocked.execute.mockResolvedValueOnce(useCaseReponseMock)
    const result = await recoverPassControllerMocked.perform(request)

    expect(result).toEqual({
      statusCode: 200,
      data: useCaseReponseMock.data
    })
    expect(recoverPassUseCaseMocked.execute).toBeCalledTimes(1)
    expect(recoverPassUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  test('Should return EmailNotFoundError', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new EmailNotFoundError()
    }

    recoverPassUseCaseMocked.execute.mockResolvedValueOnce(useCaseReponseMock)
    const result = await recoverPassControllerMocked.perform(request)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }
    expect(result).toEqual(controllerReponseExpected)
    expect(recoverPassUseCaseMocked.execute).toBeCalledTimes(1)
    expect(recoverPassUseCaseMocked.execute).toBeCalledWith(request)
  })

  test('Should return EmailNotSentError', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new EmailNotSentError()
    }

    recoverPassUseCaseMocked.execute.mockResolvedValueOnce(useCaseReponseMock)
    const result = await recoverPassControllerMocked.perform(request)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }
    expect(result).toEqual(controllerReponseExpected)
    expect(recoverPassUseCaseMocked.execute).toBeCalledTimes(1)
    expect(recoverPassUseCaseMocked.execute).toBeCalledWith(request)
  })

  test('Should return PasswordNotUpdatedError', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new PasswordNotUpdatedError()
    }

    recoverPassUseCaseMocked.execute.mockResolvedValueOnce(useCaseReponseMock)
    const result = await recoverPassControllerMocked.perform(request)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }
    expect(result).toEqual(controllerReponseExpected)
    expect(recoverPassUseCaseMocked.execute).toBeCalledTimes(1)
    expect(recoverPassUseCaseMocked.execute).toBeCalledWith(request)
  })

  test('Should return ServerError', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }

    recoverPassUseCaseMocked.execute.mockResolvedValueOnce(useCaseReponseMock)
    const result = await recoverPassControllerMocked.perform(request)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }
    expect(result).toEqual(controllerReponseExpected)
    expect(recoverPassUseCaseMocked.execute).toBeCalledTimes(1)
    expect(recoverPassUseCaseMocked.execute).toBeCalledWith(request)
  })
})
