import { NextFunction, Request, Response } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

interface Payload extends JwtPayload {
  userId: string
  role: string
}

const secret = process.env.SECRET_JWT || ''
function verifyToken(req: Request, res: Response) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res
      .status(401)
      .json({ error: 'Acesso restrito a usuários autenticados' })
  }

  const [, token] = authToken.split(' ')
  try {
    const payload = verify(token, secret)
    return payload
  } catch (e) {
    return res.status(401).json({ error: 'Token de autenticação inválido' })
  }
}

export function IsUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = verifyToken(req, res) as Payload
  if (payload) {
    return next()
  }
}

export function isUserAdmin(req: Request, res: Response, next: NextFunction) {
  const payload = verifyToken(req, res) as Payload

  const { role } = payload as Payload
  if (role !== 'administrador') {
    return res.status(401).json({ error: 'Acesso restrito a administradores' })
  }

  return next()
}

export function isNotQueryUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = verifyToken(req, res) as Payload

  const { role } = payload
  if (role === 'consulta') {
    return res.status(401).json({
      error: 'Usuários de consulta não podem acessar esta funcionalidade'
    })
  }

  return next()
}
