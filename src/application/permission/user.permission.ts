import { UserRepository } from '../../domain/repository/user.repository'
import { OperationType } from '../../shared/permission/operation-type.permission'
import { RoleSpecification } from '../../shared/permission/role-specification.permission'

export class UserPermission {
  private readonly userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public hasPermission(userId: string, operationType: OperationType): boolean {
    const user = this.userRepository.findByIdAndIsDeletedFalse(userId)

    return RoleSpecification.PERMISSIONS.find(
      (perm) => perm.role === user.getRole()
    )?.permissions.includes(operationType) as boolean
  }
}
