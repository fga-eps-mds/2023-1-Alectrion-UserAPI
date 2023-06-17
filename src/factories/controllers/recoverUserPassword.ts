import { RecoverUserPasswordController } from '../../presentation/controller/recoverUserPasswordController'
import { makeRecoverUserPassword } from '../useCases/recoverUserPassword'

export const makeRecoverUserPasswordController = () => {
  return new RecoverUserPasswordController(makeRecoverUserPassword())
}
