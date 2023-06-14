import { sign } from 'jsonwebtoken'
import { TokenService } from './token.service'

export class TokenGeneratorService implements TokenService {
  private TIME_TOKEN_EXPIRE = '1d'

  public generateToken(payload: string): string {
    return sign(
      {
        id: payload
      },
      process.env.SECRET_JWT ?? '',
      {
        expiresIn: this.TIME_TOKEN_EXPIRE
      }
    )
  }
}
