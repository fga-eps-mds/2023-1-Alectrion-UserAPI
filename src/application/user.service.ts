import { NewCredential } from '../domain/entity/new-credential'
import { User } from '../domain/entity/user'

export interface UserService {
  save(authorId: string, user: User): Promise<User>
  update(authorId: string, user: User): Promise<User>
  delete(authorId: string, userId: string): Promise<void>
  updatePassword(authorId: string, newCredential: NewCredential): Promise<void>
}
