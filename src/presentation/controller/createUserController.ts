import {
  PasswordNotProvidedError,
  UserAlreadyExistsError
} from './../../useCase/createUser/createUserUseCase'
import { Controller } from '../protocols/controller'
import {
  CreateUserUseCase,
  EmailNotSentError
} from '../../useCase/createUser/createUserUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type HttpRequest = {
  name: string
  email: string
  username: string
  cpf: string
  jobFunction:
    | 'DELEGADO'
    | 'AGENTE_POLICIA'
    | 'ESCRIVAO'
    | 'COORDENADOR'
    | 'CHEFE_SECAO'
    | 'GENERICO'
    | 'COMISSIONADO'
    | 'ESTAGIARIO'
    | 'SUPERINTENDENTE'
  role: 'ADMIN' | 'GERENTE' | 'BASICO' | 'CONSULTA'
  password?: string
}

type Model =
  | Error
  | {
      email: string
      job: string
    }

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createUser.execute(params)
    if (response.isSuccess && response.data) return ok(response.data)

    if (response.error instanceof UserAlreadyExistsError)
      return badRequest(new BadRequestError(response.error.message))

    if (response.error instanceof EmailNotSentError)
      return badRequest(new BadRequestError(response.error.message))

    if (response.error instanceof PasswordNotProvidedError)
      return badRequest(new BadRequestError(response.error.message))

    return serverError(response.error)
  }
}
