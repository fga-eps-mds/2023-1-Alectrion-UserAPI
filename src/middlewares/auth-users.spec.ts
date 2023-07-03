import { Request, Response, NextFunction } from 'express'
import { IsUserAuthenticated, isNotQueryUser, isUserAdmin } from './auth-users'
import { verify } from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}))

describe('User authorization', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: jest.Mock

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer' } }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call next() if the authentication token is present and valid', () => {
    const payload = { userId: 'admin', role: 'administrador' }
    ;(verify as jest.Mock).mockReturnValue(payload)

    IsUserAuthenticated(req as Request, res as Response, next as NextFunction)

    expect(next).toHaveBeenCalled()
  })

  it('should return 401 status if the authentication token is invalid', () => {
    req.headers = { authorization: 'Bearer 1231' }
    ;(verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error()
    })
    IsUserAuthenticated(req as Request, res as Response, next as NextFunction)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Token de autenticação inválido'
    })
  })

  it('shouldnt call next() if the authentication token is not present', () => {
    req.headers = { authorization: '' }

    IsUserAuthenticated(req as Request, res as Response, next as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Acesso restrito a usuários autenticados'
    })
  })

  test("should return 401 response if user's role is 'consulta'", () => {
    const payload = { userId: 'admin', role: 'consulta' }
    ;(verify as jest.Mock).mockReturnValue(payload)

    isNotQueryUser(req as Request, res as Response, next as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Usuários de consulta não podem acessar esta funcionalidade'
    })
    expect(next).not.toHaveBeenCalled()
  })

  test("should call next if user's role is not 'consulta'", () => {
    const payload = { userId: 'admin', role: 'basico' }
    ;(verify as jest.Mock).mockReturnValue(payload)

    isNotQueryUser(req as Request, res as Response, next as NextFunction)

    expect(next).toHaveBeenCalled()
  })

  it('shouldnt call next() if user is not admin', () => {
    const payload = { userId: 'admin', role: 'basico' }
    ;(verify as jest.Mock).mockReturnValue(payload)

    isUserAdmin(req as Request, res as Response, next as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Acesso restrito a administradores'
    })
  })

  it('should call next() if user is admin', () => {
    const payload = { userId: 'admin', role: 'administrador' }
    ;(verify as jest.Mock).mockReturnValue(payload)

    isUserAdmin(req as Request, res as Response, next as NextFunction)

    expect(next).toHaveBeenCalled()
  })
})
