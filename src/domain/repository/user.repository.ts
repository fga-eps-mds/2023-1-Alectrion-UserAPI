import { User } from '../entity/user'

export interface UserRepository {
  save(user: User): Promise<User>
  delete(userId: string): Promise<void>
  findAllWithIsDeletedFalse(): Promise<Array<User>>
  findByIdAndIsDeletedFalse(userId: string): Promise<User>
  findByUsernameAndIsDeletedFalse(username: string): Promise<User>
}
