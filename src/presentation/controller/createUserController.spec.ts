import { mock } from 'jest-mock-extended'
import {
  CreateUserUseCase,
  CreateUserData,
  UserAlreadyExistsError,
  EmailNotSentError,
  PasswordNotProvidedError
} from '../../useCase/createUser/createUserUseCase'
import { CreateUserController } from './createUserController'
import { datatype } from 'faker'
import { ServerError } from '../errors'

describe('CreateUserController', () => {
  const request: CreateUserData = {
    name: datatype.string(),
    email: datatype.string(),
    username: datatype.string(),
    cpf: datatype.string(),
    jobFunction: 'GENERICO',
    role: 'BASICO',
    password: datatype.string()
  }

  const createUserUseCaseMocked = mock<CreateUserUseCase>()
  const createUserController = new CreateUserController(createUserUseCaseMocked)
  it('CreateUserController return 200 when create user with success', async () => {
    const useCaseReponseMock = {
      isSuccess: true,
      data: { email: 'any_email', job: 'generic' }
    }
    createUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 200,
      data: useCaseReponseMock.data
    }

    const response = await createUserController.perform(request)

    expect(response).toEqual(controllerReponseExpected)
    expect(createUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(createUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Deve retonar 400 quando erro de usu', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new UserAlreadyExistsError('email já utilizado')
    }
    createUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await createUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(createUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(createUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('should return badrequest if email not send', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new EmailNotSentError()
    }
    createUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await createUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(createUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(createUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('should return password not provided if user is of type CONSULTA', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new PasswordNotProvidedError()
    }
    createUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await createUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(createUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(createUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Deve retonar 500 quando o servidor não precessar', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    createUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await createUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
  })
})
