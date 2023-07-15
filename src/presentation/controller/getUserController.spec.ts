import { mock } from 'jest-mock-extended'
import {
  GetUserError,
  GetUserUseCase
} from '../../useCase/getUser/getUserUseCase'
import { datatype } from 'faker'
import { ServerError } from '../errors'
import { GetUserController } from './getUserController'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'

const getUserUseCaseMocked = mock<GetUserUseCase>()
const getUserController = new GetUserController(getUserUseCaseMocked)

const request = {
  userId: datatype.string()
}

describe('Should test get user controller', () => {
  it('Should return bad request when fail searching', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new GetUserError()
    }
    getUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await getUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(getUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(getUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return ok', async () => {
    const mockedRequest = {
      isSuccess: true,
      data: [
        {
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
      ]
    }
    getUserUseCaseMocked.execute.mockResolvedValue(mockedRequest)

    const controllerReponseExpected = {
      statusCode: 200,
      data: mockedRequest.data
    }

    const response = await getUserController.perform(request)

    expect(response).toEqual(controllerReponseExpected)
    expect(getUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(getUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return server error when fail ', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    getUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await getUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
  })
})
