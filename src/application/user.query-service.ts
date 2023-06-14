import { Credential } from '../domain/entity/credential'
import { User } from '../domain/entity/user'

export interface UserQueryService {
  findAll(authorId: string): Promise<Array<User>>
  findById(authorId: string, userId: string): Promise<User>
  authenticate(credential: Credential): Promise<User>
}
