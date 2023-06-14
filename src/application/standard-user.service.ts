import { User } from '../domain/entity/user'
import { AccessForbiddenError } from '../domain/error/permission.access-forbidden.error'
import { UserRepository } from '../domain/repository/user.repository'
import { OperationType } from '../shared/permission/operation-type.permission'
import { UserPermission } from './permission/user.permission'
import { UserService } from './user.service'
import { UserCreationValidation } from './validation/user-creation.validation'
import { UserUpdateValidation } from './validation/user-update.validation'

export class StandardUserService implements UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userPermission: UserPermission,
    private readonly userCreationValidation: UserCreationValidation,
    private readonly userUpdateValidation: UserUpdateValidation
  ) {}

  public async save(authorId: string, user: User): Promise<User> {
    if (
      this.userPermission.hasPermission(authorId, OperationType.CREATE_USER)
    ) {
      throw new AccessForbiddenError()
    }

    this.userCreationValidation.validateCreation(user)

    return await this.userRepository.save(user)
  }

  public async update(authorId: string, user: User): Promise<User> {
    if (
      this.userPermission.hasPermission(authorId, OperationType.UPDATE_USER)
    ) {
      throw new AccessForbiddenError()
    }

    this.userUpdateValidation.validateUpdate(user)

    return await this.userRepository.save(user)
  }

  public async delete(authorId: string, userId: string): Promise<void> {
    if (
      this.userPermission.hasPermission(authorId, OperationType.DELETE_USER)
    ) {
      throw new AccessForbiddenError()
    }

    return await this.userRepository.delete(userId)
  }
}
