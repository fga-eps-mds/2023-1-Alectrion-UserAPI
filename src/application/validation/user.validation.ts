import { User } from '../../domain/entity/user'
import { InvalidCpfError } from '../../domain/error/validation.invalid-cpf.error'
import { InvalidEmailError } from '../../domain/error/validation.invalid-email.error'
import { InvalidJobError } from '../../domain/error/validation.invalid-job.error'
import { InvalidNameError } from '../../domain/error/validation.invalid-name.error'
import { InvalidPasswordError } from '../../domain/error/validation.invalid-password.error'
import { InvalidRoleError } from '../../domain/error/validation.invalid-role.error'
import { InvalidUsernameError } from '../../domain/error/validation.invalid-username.error'
import { UserRepository } from '../../domain/repository/user.repository'

export class UserValidation {
  public constructor(public readonly userRespository: UserRepository) {}

  public validate(user: User): void {
    if (user.getCpf() === '') {
      throw new InvalidCpfError()
    }

    if (user.getUsername() === '') {
      throw new InvalidUsernameError()
    }

    if (user.getName() === '') {
      throw new InvalidNameError()
    }

    if (user.getPassword() === '') {
      throw new InvalidPasswordError()
    }

    if (user.getEmail() === '') {
      throw new InvalidEmailError()
    }

    if (user.getJob() === null) {
      throw new InvalidJobError()
    }

    if (user.getRole() === null) {
      throw new InvalidRoleError()
    }
  }
}
