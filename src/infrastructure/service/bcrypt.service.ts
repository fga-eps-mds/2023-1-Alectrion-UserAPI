import { compareSync, hashSync } from 'bcrypt'
import { EncrypteService } from './encrypte.service'

export class BcryptService implements EncrypteService {
  public compare(passwordLogin: string, passwordDB: string): boolean {
    return compareSync(passwordLogin, passwordDB)
  }

  public encrypt(password: string): string {
    return hashSync(password, 10)
  }
}
