import {
  IncorrectPasswordError,
  LackingInformationError,
  UpdatePasswordData,
  UpdatePasswordError
} from '../../useCase/updatePassword/updatePasswordUseCase'
import { ServerError } from '../errors'
import { HttpResponse } from '../helpers'
import { UpdatePasswordControler } from './updatePasswordController'

describe('UpdatePasswordController', () => {
  const mockUpdatePasswordUseCase = {
    execute: jest.fn()
  }

  const request: UpdatePasswordData = {
    actualPassword: '123456',
    userId: '123',
    email: 'example@example.com',
    username: 'example',
    password: 'newpassword'
  }

  const controller = new UpdatePasswordControler(
    mockUpdatePasswordUseCase as any
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return an "ok" response with the message when the use case execution is successful', async () => {
    const useCaseResponse = {
      isSuccess: true,
      data: {
        message: 'Senha atualizada!'
      }
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 200,
      data: useCaseResponse.data
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response).toEqual(expectedResponse)
  })

  it('should return UpdatePasswordError', async () => {
    const useCaseResponse = {
      isSuccess: false,
      error: new UpdatePasswordError()
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 400,
      data: useCaseResponse.error
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })

  it('should return Incorrect Password', async () => {
    const useCaseResponse = {
      isSuccess: false,
      error: new IncorrectPasswordError()
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 400,
      data: useCaseResponse.error
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })

  it('should return Lacking INformation Error', async () => {
    const useCaseResponse = {
      isSuccess: false,
      error: new LackingInformationError()
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 400,
      data: useCaseResponse.error
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })

  it('should return ServerError Password', async () => {
    const useCaseResponse = {
      isSuccess: false,
      error: new ServerError()
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 500,
      data: useCaseResponse.error
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })
})
