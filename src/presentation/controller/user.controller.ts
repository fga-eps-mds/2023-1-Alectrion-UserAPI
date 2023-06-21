import { Request, Response } from 'express'
import { UserService } from '../../application/user.service'
import { UserQueryService } from '../../application/user.query-service'
import { UserResource } from '../resource/user-resource'
import { CustomRequest } from '../helpers/custom-request'
import { UserResourceConverter } from '../resource/converter/user-resource.converter'
import { CredentialResource } from '../resource/credential-resource'
import { CredentialResourceConverter } from '../resource/converter/credential-resource.converter'
import { TokenGeneratorService } from '../../infrastructure/service/token-generator.service'
import { NewCredentialResource } from '../resource/new-credential-resource'
import { NewCredentialResourceConverter } from '../resource/converter/new-credential-resource.converter'

export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly userQueryService: UserQueryService,
    private readonly userResouceConvert: UserResourceConverter,
    private readonly credentialResourceConverter: CredentialResourceConverter,
    private readonly tokenGenaratorService: TokenGeneratorService,
    private readonly newCredentialResourceConverter: NewCredentialResourceConverter
  ) {}

  public async register(
    request: CustomRequest<UserResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    return response
      .status(201)
      .send(
        this.userResouceConvert.mapTo(
          await this.userService.save(
            request.params.authorId,
            this.userResouceConvert.mapFrom(request.body)
          )
        )
      )
  }

  public async update(
    request: CustomRequest<UserResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    return response
      .status(200)
      .send(
        this.userResouceConvert.mapTo(
          await this.userService.update(
            request.params.authorId,
            this.userResouceConvert.mapFrom(request.body)
          )
        )
      )
  }

  public async delete(
    request: CustomRequest<UserResource>,
    response: Response
  ): Promise<Response> {
    return response
      .status(200)
      .send(
        await this.userService.delete(
          request.params.authorId,
          request.params.userId
        )
      )
  }

  public async getAll(
    request: CustomRequest<UserResource>,
    response: Response<Array<UserResource>>
  ): Promise<Response<Array<UserResource>>> {
    return response
      .status(200)
      .send(
        await this.userQueryService
          .findAll(request.params.authorId)
          .then((it) => it.map((elem) => this.userResouceConvert.mapTo(elem)))
      )
  }

  public async getById(
    request: CustomRequest<UserResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    return response
      .status(200)
      .send(
        this.userResouceConvert.mapTo(
          await this.userQueryService.findById(
            request.params.authorId,
            request.params.userId
          )
        )
      )
  }

  public async authenticate(
    request: CustomRequest<CredentialResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    const user = await this.userQueryService.authenticate(
      this.credentialResourceConverter.mapFrom(request.body)
    )
    return response
      .status(200)
      .send(this.userResouceConvert.mapTo(user))
      .setHeader(
        'Authorization',
        'Bearer ' + this.tokenGenaratorService.generateToken(user.getId())
      )
  }

  public async updatePassword(
    request: CustomRequest<NewCredentialResource>,
    response: Response<UserResource>
  ): Promise<Response> {
    await this.userService.updatePassword(
      request.params.authorId,
      this.newCredentialResourceConverter.mapFrom(request.body)
    )
    return response.status(200)
  }

  public async validate(
    request: Request,
    response: Response<boolean>
  ): Promise<Response<boolean>> {
    return response
      .status(200)
      .send(
        await this.userQueryService.validate(
          request.params.userId,
          request.params.key
        )
      )
  }
}
