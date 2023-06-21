import { AccessForbiddenError } from '../../domain/error/permission.access-forbidden.error'
import { UserRepository } from '../../domain/repository/user.repository'
import { OperationType } from '../../shared/permission/operation-type.permission'
import { RoleSpecification } from '../../shared/permission/role-specification.permission'

export class UserPermission {
  private readonly userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  private async hasPermission(
    userId: string,
    operationType: OperationType
  ): Promise<boolean> {
    const user = await this.userRepository.findByIdAndIsDeletedFalse(userId)

    return RoleSpecification.PERMISSIONS.find(
      (perm) => perm.role === user.getRole()
    )?.permissions.includes(operationType) as boolean
  }

  public toRead(userId: string): void {
    if (!this.hasPermission(userId, OperationType.READ_USER)) {
      throw new AccessForbiddenError()
    }
  }

  public toCreate(userId: string): void {
    if (!this.hasPermission(userId, OperationType.CREATE_USER)) {
      throw new AccessForbiddenError()
    }
  }

  public toDelete(userId: string): void {
    if (!this.hasPermission(userId, OperationType.DELETE_USER)) {
      throw new AccessForbiddenError()
    }
  }

  public toUpdate(userId: string): void {
    if (!this.hasPermission(userId, OperationType.UPDATE_USER)) {
      throw new AccessForbiddenError()
    }
  }
}
