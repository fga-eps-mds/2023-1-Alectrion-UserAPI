import { User } from '../../domain/entity/user'
import { UserAlreadyExistsError } from '../../domain/error/validation.user-already-exists.error'
import { UserRepository } from '../../domain/repository/user.repository'
import { UserValidation } from './user.validation'

export class UserCreationValidation extends UserValidation {
  public constructor(userRepository: UserRepository) {
    super(userRepository)
  }

  public async validateCreation(user: User): Promise<void> {
    this.validate(user)

    const possibleUser =
      await this.userRespository.findByUsernameAndIsDeletedFalse(
        user.getUsername()
      )
    if (possibleUser !== null) {
      throw new UserAlreadyExistsError()
    }
  }
}
