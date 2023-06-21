export interface TokenService {
  generateToken(payload: string): string
}
