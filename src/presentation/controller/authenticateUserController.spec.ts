import { mock } from 'jest-mock-extended'
import {
  AuthenticateUserUseCase,
  DataUserLogin
} from '../../useCase/authenticationUser/authenticationUserUseCase'
import { datatype } from 'faker'
import { AuthenticationUserController } from './authenticateUserController'
import { ServerError } from '../errors'

describe('AuthenticateUserController', () => {
  const request: DataUserLogin = {
    identifier: datatype.string(),
    password: datatype.string()
  }

  const authenticateUserUseCaseMocked = mock<AuthenticateUserUseCase>()
  const authenticationUserController = new AuthenticationUserController(
    authenticateUserUseCaseMocked
  )

  it('should return 200 when authenticate an user ', async () => {
    const useCaseReponseMock = {
      isSuccess: true,
      data: {
        token: datatype.string(),
        expireIn: datatype.string(),
        email: datatype.string(),
        name: datatype.string(),
        role: datatype.string(),
        job: datatype.string(),
        cpf: datatype.string(),
        id: datatype.string(),
        temporaryPassword: datatype.boolean()
      }
    }
    authenticateUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerResponseExpected = {
      statusCode: 200,
      data: useCaseReponseMock.data
    }

    const response = await authenticationUserController.perform(request)
    expect(response).toEqual(controllerResponseExpected)
    expect(authenticateUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(authenticateUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('should return 500 when not authenticate an user', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    authenticateUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)
    const controllerResponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await authenticationUserController.perform(request)
    expect(response).toEqual(controllerResponseExpected)
  })
})
