import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface PayLoad {
  userId: string
  role: string
}

const secret = process.env.SECRET_JWT || ''

export function IsUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req)
  const authToken = req.headers.authorization
  if (!authToken) {
    return res
      .status(401)
      .json({ error: 'Acesso restrito a usuários autenticados' })
  }

  const [, token] = authToken.split(' ')
  try {
    verify(token, secret) as PayLoad
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' })
  }
}

export function isUserAdmin(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res
      .status(401)
      .json({ error: 'Acesso restrito a usuários autenticados' })
  }
  const [, token] = authToken.split(' ')

  try {
    const { role } = verify(token, secret) as PayLoad
    if (role !== 'administrador') {
      return res
        .status(401)
        .json({ error: 'Acesso restrito a administradores' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' })
  }
  return next()
}
