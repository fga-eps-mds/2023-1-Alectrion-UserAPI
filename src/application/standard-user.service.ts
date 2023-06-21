import { NewCredential } from '../domain/entity/new-credential'
import { User } from '../domain/entity/user'
import { UserRepository } from '../domain/repository/user.repository'
import { EncrypteService } from '../infrastructure/service/encrypte.service'
import { UserPermission } from './permission/user.permission'
import { UserService } from './user.service'
import { UserCreationValidation } from './validation/user-creation.validation'
import { UserCredentialValidation } from './validation/user-credential.validation'
import { UserUpdateValidation } from './validation/user-update.validation'

export class StandardUserService implements UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly userPermission: UserPermission,
    private readonly userCreationValidation: UserCreationValidation,
    private readonly userUpdateValidation: UserUpdateValidation,
    private readonly userCredentialValidation: UserCredentialValidation,
    private readonly encryteService: EncrypteService
  ) {}

  public async save(authorId: string, user: User): Promise<User> {
    this.userPermission.toCreate(authorId)
    this.userCreationValidation.validateCreation(user)

    return await this.userRepository.save(user)
  }

  public async update(authorId: string, user: User): Promise<User> {
    this.userPermission.toUpdate(authorId)
    this.userUpdateValidation.validateUpdate(user)

    return await this.userRepository.update(user)
  }

  public async delete(authorId: string, userId: string): Promise<void> {
    this.userPermission.toDelete(authorId)

    return await this.userRepository.delete(userId)
  }

  public async updatePassword(
    authorId: string,
    newCredential: NewCredential
  ): Promise<void> {
    this.userPermission.toUpdate(authorId)
    this.userCredentialValidation.validate(newCredential)

    newCredential.setNewPassword(
      this.encryteService.encrypt(newCredential.getNewPassword())
    )

    this.userRepository.saveNewPassword(newCredential)
  }
}
