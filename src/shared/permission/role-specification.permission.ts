import { Role } from '../../domain/entity/role'
import { OperationType } from './operation-type.permission'
import { PermissionSpecification } from './specification.permission'

export class RoleSpecification {
  public static ADMIN_PERMISSIONS = new PermissionSpecification(Role.ADMIN, [
    OperationType.CREATE_USER,
    OperationType.DELETE_USER,
    OperationType.UPDATE_USER,
    OperationType.READ_USER
  ])

  public static MANAGER_PERMISSIONS = new PermissionSpecification(
    Role.MANAGER,
    [
      OperationType.CREATE_USER,
      OperationType.UPDATE_USER,
      OperationType.READ_USER
    ]
  )

  public static BASIC_PERMISSIONS = new PermissionSpecification(Role.BASIC, [
    OperationType.UPDATE_USER,
    OperationType.READ_USER
  ])

  public static VIEWER_PERMISSIONS = new PermissionSpecification(Role.VIEWER, [
    OperationType.READ_USER
  ])

  public static PERMISSIONS: Array<PermissionSpecification> = [
    this.ADMIN_PERMISSIONS,
    this.MANAGER_PERMISSIONS,
    this.BASIC_PERMISSIONS,
    this.VIEWER_PERMISSIONS
  ]
}
