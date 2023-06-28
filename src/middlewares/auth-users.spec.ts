import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { IsUserAuthenticated, isNotQueryUser, isUserAdmin } from './auth-users'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}))

describe('User authorization', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let verifyMock: jest.Mock

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer token' } } as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    next = jest.fn()
    verifyMock = jest.fn()
    ;(verify as jest.Mock).mockImplementation(verifyMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call next() if the authentication token is present and valid', () => {
    const mockedRes = { userId: '123', role: 'consulta' }
    verifyMock().mockReturnValueOnce(mockedRes)

    IsUserAuthenticated(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should return 401 status if the authentication token is invalid', () => {
    const mockedRes = new Error()
    verifyMock().mockReturnValueOnce(mockedRes)
    IsUserAuthenticated(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.end).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('shouldnt call next() if the authentication token is not present', () => {
    const req = { headers: { authorization: '' } } as Request
    const mockedRes = new Error()
    verifyMock().mockReturnValueOnce(mockedRes)
    IsUserAuthenticated(req, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(verify).toHaveBeenCalledWith('', expect.anything())
  })

  test("should return error response if user's role is 'consulta'", () => {
    const mockedRes = { userId: 'user-id', role: 'consulta' }
    verifyMock().mockReturnValueOnce(mockedRes)

    isNotQueryUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Usuários de consulta não podem acessar essa funcionalidade'
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('shouldnt call next() if user is not admin', () => {
    const mockedRes = { userId: 'userId', role: 'consulta' }
    verifyMock().mockReturnValueOnce(mockedRes)
    isUserAdmin(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Acesso restrito a administradores'
    })
  })
})
