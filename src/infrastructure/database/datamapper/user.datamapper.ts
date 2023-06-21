import { Job } from '../../../domain/entity/job'
import { Role } from '../../../domain/entity/role'
import { User } from '../../../domain/entity/user'

export class UserDataMapper {
  public convertTo(userDb: any): User {
    const user = new User()

    user.setId(userDb?.id)
    user.setCpf(userDb?.cpf)
    user.setUsername(userDb?.username)
    user.setName(userDb?.name)
    user.setPassword(userDb?.password)
    user.setEmail(userDb?.email)
    user.setJob(userDb?.job as Job)
    user.setRole(userDb?.role as Role)
    user.setIsDeleted(userDb?.isDeleted)
    user.setFirstAccess(userDb?.firstAccess)
    user.setCreatedAt(userDb?.createdAt)
    user.setUpdatedAt(userDb?.updatedAt)

    return user
  }
}
