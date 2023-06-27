import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { Role } from '../infrastructure/db/entities/userEnum/role'

export class NotAdminError extends Error {
  constructor() {
    super('Só pode ser acessado por um ADMIN!')
    this.name = 'NotAdminError'
  }
}

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
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).end()
  }
  const [, token] = authToken.split(' ')
  try {
    const { role } = verify(token, secret) as PayLoad

    return next()
  } catch (error) {
    return res.status(401).end()
  }
}
