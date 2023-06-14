import { UpdatePasswordControler } from '../../presentation/controller/updatePasswordController'
import { makeUpdateUser } from '../useCases/updatePassword'

export const makeUpdatePasswordController = () => {
  return new UpdatePasswordControler(makeUpdateUser())
}
