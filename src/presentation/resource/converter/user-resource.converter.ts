import { Job } from '../../../domain/entity/job'
import { Role } from '../../../domain/entity/role'
import { User } from '../../../domain/entity/user'
import { UserResource } from '../user-resource'

export class UserResourceConverter {
  public mapUserToUserResource(user: User): UserResource {
    const userResource = new UserResource()

    userResource.setId(user.getId())
    userResource.setCpf(user.getCpf())
    userResource.setUsername(user.getUsername())
    userResource.setName(user.getName())
    userResource.setPassword(user.getPassword())
    userResource.setEmail(user.getEmail())
    userResource.setJob(user.getJob())
    userResource.setRole(user.getRole())
    userResource.setIsDeleted(user.getIsDeleted())
    userResource.setFirstAccess(user.getFirstAccess())

    return userResource
  }

  public mapUserResourceToUser(userResource: UserResource): User {
    const user = new User()

    user.setId(userResource.getId())
    user.setCpf(userResource.getCpf())
    user.setUsername(userResource.getUsername())
    user.setName(userResource.getName())
    user.setPassword(userResource.getPassword())
    user.setEmail(userResource.getEmail())
    user.setJob(userResource.getJob() as Job)
    user.setRole(userResource.getRole() as Role)
    user.setIsDeleted(userResource.getIsDeleted())
    user.setFirstAccess(userResource.getFirstAccess())

    return user
  }
}
