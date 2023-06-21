import { NewCredential } from '../../domain/entity/new-credential'
import { WrongPasswordError } from '../../domain/error/permission.wrong-password.error'
import { InvalidUsernameError } from '../../domain/error/validation.invalid-username.error'
import { SamePasswordError } from '../../domain/error/validation.same-password.error'
import { UserRepository } from '../../domain/repository/user.repository'
import { EncrypteService } from '../../infrastructure/service/encrypte.service'

export class UserCredentialValidation {
  public constructor(
    public readonly userRepository: UserRepository,
    public readonly encrypteService: EncrypteService
  ) {}

  public async validate(newCredential: NewCredential): Promise<void> {
    await this.userRepository
      .findByIdAndIsDeletedFalse(newCredential.getUserId())
      .then((it: any) => {
        if (it !== null) {
          throw new InvalidUsernameError()
        }

        if (newCredential.getOldPassword() === newCredential.getNewPassword()) {
          throw new SamePasswordError()
        }

        if (
          this.encrypteService.compare(
            it.getPassword(),
            newCredential.getOldPassword()
          )
        ) {
          throw new WrongPasswordError()
        }
      })
  }
}
