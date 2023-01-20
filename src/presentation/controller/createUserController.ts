import { UserAlreadyExistsError } from './../../useCase/createUser/createUserUseCase'
import { Controller } from '../protocols/controller'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type HttpRequest = {
  name: string
  email: string
  username: string
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
  password: string
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
    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof UserAlreadyExistsError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}
