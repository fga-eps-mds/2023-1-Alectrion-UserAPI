import { adaptExpressRoute } from './express-router' // Import the module you want to test
import { Controller } from '../presentation/protocols/controller' // Import the controller module you want to test

describe('adaptExpressRoute', () => {
  it('should call the controller with the merged request data and send the response', async () => {
    const controller = {
      handle: jest.fn().mockResolvedValue({ statusCode: 200, data: 'Success' })
    }
    const req = {
      body: { key: 'value' },
      query: { page: 1 },
      params: { id: '123' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()

    await adaptExpressRoute(controller as unknown as Controller)(
      req as any,
      res as any,
      next as any
    )

    expect(controller.handle).toHaveBeenCalledWith({
      key: 'value',
      page: 1,
      id: '123'
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith('Success')
    expect(next).not.toHaveBeenCalled()
  })

  it('should send an error response if the controller returns a non-success status code', async () => {
    const controller = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 400,
        data: { message: 'Bad Request' }
      })
    }
    const req = {
      body: {},
      query: {},
      params: {}
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn()

    await adaptExpressRoute(controller as unknown as Controller)(
      req as any,
      res as any,
      next as any
    )

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' })
    expect(next).not.toHaveBeenCalled()
  })
})

describe('Controller', () => {
  class TestController extends Controller {
    async perform(httpRequest: any): Promise<any> {
      return { statusCode: 200, data: 'Success' }
    }
  }

  it('should call perform method and return the result on successful execution', async () => {
    const controller = new TestController()
    const httpRequest = {}

    const response = await controller.handle(httpRequest)

    expect(response).toEqual({ statusCode: 200, data: 'Success' })
  })
})
