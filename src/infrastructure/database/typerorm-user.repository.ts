import { NewCredential } from '../../domain/entity/new-credential'
import { User } from '../../domain/entity/user'
import { UserRepository } from '../../domain/repository/user.repository'
import { dataSource } from './config'

export class TypeormUserRepository implements UserRepository {
  public constructor(
    public readonly typeorm = dataSource.getRepository(User)
  ) {}

  public async save(user: User): Promise<User> {
    return await this.typeorm.save(user)
  }

  public async update(user: User): Promise<User> {
    return await this.typeorm
      .update(user.getId(), user)
      .then((it) => it as unknown as User)
  }

  public async delete(userId: string): Promise<void> {
    await this.typeorm.update(userId, {
      isDeleted: true
    })
  }

  public async findAllWithIsDeletedFalse(): Promise<User[]> {
    return await this.typeorm.find({
      select: {
        isDeleted: false
      }
    })
  }

  public async findByIdAndIsDeletedFalse(userId: string): Promise<User | null> {
    return await this.typeorm.findOne({
      where: {
        id: userId,
        isDeleted: false
      }
    })
  }

  public async findByUsernameAndIsDeletedFalse(
    username: string
  ): Promise<User | null> {
    return await this.typeorm.findOne({
      where: {
        username,
        isDeleted: false
      }
    })
  }

  public async saveNewPassword(newCredential: NewCredential): Promise<void> {
    await this.typeorm.update(newCredential.getUserId(), {
      password: newCredential.getNewPassword()
    })
  }

  public async existsByUserId(userId: string): Promise<boolean> {
    return await this.findByIdAndIsDeletedFalse(userId).then(
      (it) => it !== null
    )
  }
}
