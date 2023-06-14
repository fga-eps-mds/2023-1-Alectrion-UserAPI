import { Response } from 'express'
import { UserService } from '../../application/user.service'
import { UserQueryService } from '../../application/user.query-service'
import { UserResource } from '../resource/user-resource'
import { CustomRequest } from '../helpers/custom-request'
import { UserResourceConverter } from '../resource/converter/user-resource.converter'
import { CredentialResource } from '../resource/credential-resource'
import { CredentialResourceConverter } from '../resource/converter/credential-resource.converter'
import { TokenGeneratorService } from '../../infrastructure/service/token-generator.service'

export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly userQueryService: UserQueryService,
    private readonly userResouceConvert: UserResourceConverter,
    private readonly credentialResourceConverter: CredentialResourceConverter,
    private readonly tokenGenaratorService: TokenGeneratorService
  ) {}

  public async register(
    request: CustomRequest<UserResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    return response
      .status(201)
      .send(
        this.userResouceConvert.mapUserToUserResource(
          await this.userService.save(
            request.params.authorId,
            this.userResouceConvert.mapUserResourceToUser(request.body)
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
        this.userResouceConvert.mapUserToUserResource(
          await this.userService.update(
            request.params.authorId,
            this.userResouceConvert.mapUserResourceToUser(request.body)
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
          .then((it) =>
            it.map((elem) =>
              this.userResouceConvert.mapUserToUserResource(elem)
            )
          )
      )
  }

  public async getById(
    request: CustomRequest<UserResource>,
    response: Response<UserResource>
  ): Promise<Response<UserResource>> {
    return response
      .status(200)
      .send(
        this.userResouceConvert.mapUserToUserResource(
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
      this.credentialResourceConverter.mapCredentialResourceToCredential(
        request.body
      )
    )
    return response
      .status(200)
      .send(this.userResouceConvert.mapUserToUserResource(user))
      .setHeader(
        'Authorization',
        'Bearer ' + this.tokenGenaratorService.generateToken(user.getId())
      )
  }
}
