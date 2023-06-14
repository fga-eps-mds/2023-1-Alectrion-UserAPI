import { User } from '../../domain/entity/user'
import { InvalidIdError } from '../../domain/error/validation.invalid-id.error'
import { UserRepository } from '../../domain/repository/user.repository'
import { UserValidation } from './user.validation'

export class UserUpdateValidation extends UserValidation {
  public constructor(userRepository: UserRepository) {
    super(userRepository)
  }

  public validateUpdate(user: User): void {
    if (user.getId() === '') {
      throw new InvalidIdError()
    }

    this.validate(user)
  }
}
