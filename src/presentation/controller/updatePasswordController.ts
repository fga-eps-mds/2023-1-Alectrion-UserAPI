import { Controller } from '../protocols/controller'
import {
  UpdatePasswordData,
  UpdatePasswordError,
  UpdatePasswordUseCase
} from '../../useCase/updatePassword/updatePasswordUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type Model =
  | Error
  | {
      message: string
    }

export class UpdatePasswordControler extends Controller {
  constructor(private readonly updatePasswordUseCase: UpdatePasswordUseCase) {
    super()
  }

  async perform(httpRequest: UpdatePasswordData): Promise<HttpResponse<Model>> {
    const user = httpRequest
    const response = await this.updatePasswordUseCase.execute(user)

    if (response.isSuccess && response.data) return ok(response.data)

    if (response.error instanceof UpdatePasswordError)
      return badRequest(new BadRequestError(response.error.message))

    return serverError(response.error)
  }
}
