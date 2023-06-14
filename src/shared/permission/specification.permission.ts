import { Role } from '../../domain/entity/role'
import { OperationType } from './operation-type.permission'

export class PermissionSpecification {
  public role: Role
  public permissions: Array<OperationType>

  public constructor(role: Role, permissions: Array<OperationType>) {
    this.role = role
    this.permissions = permissions
  }
}
