import { compareSync, hashSync } from 'bcryptjs'
import { Encryptor } from '../services/encryptor'

export class BcryptAdapter implements Encryptor {
  compare(passwordLogin: string, passwordDB: string): boolean {
    return compareSync(passwordLogin, passwordDB)
  }

  encrypt(password: string) {
    return hashSync(password, 3)
  }
}
