export interface Token {
  generateToken(payload: object, secret: any, options: object): string
}
