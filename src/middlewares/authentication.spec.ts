import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { IsUserAuthenticated } from './authentication'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}))

describe('IsUserAuthenticated', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction
  let verifyMock: jest.Mock

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer token' } }
    res = { status: jest.fn().mockReturnThis(), end: jest.fn() }
    next = jest.fn()
    verifyMock = jest.fn()
    ;(verify as jest.Mock).mockImplementation(verifyMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call next() if the authentication token is present and valid', () => {
    const payload = { userId: 'user-id', role: 'admin' }
    verifyMock.mockReturnValueOnce(payload)

    IsUserAuthenticated(req as Request, res as Response, next)
    expect(next).toHaveBeenCalled()
  })

  it('should return 401 status if the authentication token is invalid', () => {
    verifyMock.mockImplementationOnce(() => {
      throw new Error()
    })

    IsUserAuthenticated(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.end).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('shouldnt call next() if the authentication token is not present', () => {
    req = { headers: { authorization: 'Bearer ' } }
    const payload = { userId: 'user-id', role: 'admin' }
    verifyMock.mockReturnValueOnce(payload)
    IsUserAuthenticated(req as Request, res as Response, next)
    console.log(req)
    expect(next).toHaveBeenCalled()
    expect(verify).toHaveBeenCalledWith('seu_token_aqui', expect.anything())
  })
})
