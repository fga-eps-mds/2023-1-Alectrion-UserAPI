import { Controller } from '../protocols/controller'
import {
  AuthenticateUserUseCase,
  LoginUsernameError,
  LoginPasswordError
} from '../../useCase/authenticationUser/authenticationUserUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type HttpRequest = {
  identifier: string
  password: string
}

type Model =
  | Error
  | {
      token: string
      expireIn: string
      email: string
      name: string
      role: string
      job: string
      cpf: string
      id?: string
    }

export class AuthenticationUserController extends Controller {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.authenticateUserUseCase.execute(params)
    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof LoginUsernameError) {
        return badRequest(new BadRequestError(response.error.message))
      } else if (response.error instanceof LoginPasswordError) {
        return badRequest(new BadRequestError(response.error.message))
      }
      return serverError(response.error)
    }
  }
}
