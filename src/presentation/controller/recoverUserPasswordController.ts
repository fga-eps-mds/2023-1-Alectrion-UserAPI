import { Controller } from '../protocols/controller'
import {
  RecoverUserPasswordData,
  EmailNotFoundError,
  EmailNotSentError,
  PasswordNotUpdatedError,
  RecoverUserPasswordUseCase
} from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type Model =
  | Error
  | {
      message: string
    }

export class RecoverUserPasswordController extends Controller {
  constructor(
    private readonly recoverUserPasswordUseCase: RecoverUserPasswordUseCase
  ) {
    super()
  }

  async perform(
    httpRequest: RecoverUserPasswordData
  ): Promise<HttpResponse<Model>> {
    const user = httpRequest
    const response = await this.recoverUserPasswordUseCase.execute(user)

    if (response.isSuccess && response.data) return ok(response.data)

    if (response.error instanceof EmailNotFoundError)
      return badRequest(new BadRequestError(response.error.message))

    if (response.error instanceof EmailNotSentError)
      return badRequest(new BadRequestError(response.error.message))

    if (response.error instanceof PasswordNotUpdatedError)
      return badRequest(new BadRequestError(response.error.message))

    return serverError(response.error)
  }
}
