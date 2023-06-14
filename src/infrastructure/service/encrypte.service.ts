export interface EncrypteService {
  encrypt(password: string): string
  compare(passwordDB: string, passwordLogin: string): boolean
}
