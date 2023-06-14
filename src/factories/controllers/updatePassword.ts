import { UpdateUserControler } from '../../presentation/controller/updateUserController'
import { makeUpdatePassword } from '../useCases/updatePassword'

export const makeUpdatePasswordController = () => {
  return new UpdatePasswordControler(makeUpdatePassword())
}
