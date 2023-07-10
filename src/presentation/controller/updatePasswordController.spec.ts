import {
  UpdatePasswordData,
  UpdatePasswordError
} from '../../useCase/updatePassword/updatePasswordUseCase'
import { HttpResponse } from '../helpers'
import { UpdatePasswordControler } from './updatePasswordController'

describe('UpdatePasswordController', () => {
  const mockUpdatePasswordUseCase = {
    execute: jest.fn()
  }

  const controller = new UpdatePasswordControler(
    mockUpdatePasswordUseCase as any
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return an "ok" response with the message when the use case execution is successful', async () => {
    const request: UpdatePasswordData = {
      actualPassword: '123456',
      userId: '123',
      email: 'example@example.com',
      username: 'example',
      password: 'newpassword'
    }

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

  it('should return a "badRequest" response with the error when the use case execution returns an UpdatePasswordError', async () => {
    const request: UpdatePasswordData = {
      actualPassword: '123456',
      userId: '123',
      email: 'example@example.com',
      username: 'example',
      password: 'newpassword'
    }

    const useCaseResponse = {
      isSuccess: false,
      error: new UpdatePasswordError()
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 400,
      data: {
        error:
          useCaseResponse.error.message || 'Não foi possível atualizar a senha.'
      }
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })

  it('should return a "serverError" response with the error when the use case execution returns an unhandled error', async () => {
    const request: UpdatePasswordData = {
      actualPassword: '123456',
      userId: '123',
      email: 'example@example.com',
      username: 'example',
      password: 'newpassword'
    }

    const error = new Error('Unexpected error')
    const useCaseResponse = {
      isSuccess: false,
      error
    }

    mockUpdatePasswordUseCase.execute.mockResolvedValue(useCaseResponse)

    const expectedResponse: HttpResponse<any> = {
      statusCode: 500,
      data: {
        error: error.message || 'Não foi possível alterar a senha.'
      }
    }

    const response = await controller.perform(request)

    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith(request)
    expect(response.statusCode).toEqual(expectedResponse.statusCode)
  })
})
