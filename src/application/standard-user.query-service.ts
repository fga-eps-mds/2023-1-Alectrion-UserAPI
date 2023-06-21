import { Credential } from '../domain/entity/credential'
import { User } from '../domain/entity/user'
import { AccessForbiddenError } from '../domain/error/permission.access-forbidden.error'
import { UserDoNotExistsError } from '../domain/error/permission.user-do-not-exists'
import { WrongPasswordError } from '../domain/error/permission.wrong-password.error'
import { UserRepository } from '../domain/repository/user.repository'
import { EncrypteService } from '../infrastructure/service/encrypte.service'
import { UserPermission } from './permission/user.permission'
import { UserQueryService } from './user.query-service'

export class StandardUserQueryService implements UserQueryService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userPermission: UserPermission,
    private readonly encrypteService: EncrypteService
  ) {}

  public async findAll(authorId: string): Promise<User[]> {
    this.userPermission.toRead(authorId)

    return await this.userRepository.findAllWithIsDeletedFalse()
  }

  public async findById(authorId: string, userId: string): Promise<User> {
    this.userPermission.toRead(authorId)

    return await this.userRepository.findByIdAndIsDeletedFalse(userId)
  }

  public async authenticate(credential: Credential): Promise<User> {
    const user = await this.userRepository.findByIdAndIsDeletedFalse(
      credential.getUsername()
    )

    if (!user) {
      throw new UserDoNotExistsError()
    }

    if (
      !this.encrypteService.compare(
        user.getPassword(),
        credential.getPassword()
      )
    ) {
      throw new WrongPasswordError()
    }

    return user
  }

  public async validate(userId: string, key: string): Promise<boolean> {
    if (key !== process.env.KEY_JWT) {
      throw new AccessForbiddenError()
    }
    return this.userRepository.existsByUserId(userId)
  }
}
