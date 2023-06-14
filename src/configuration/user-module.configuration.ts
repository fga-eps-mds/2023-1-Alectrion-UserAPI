import { UserPermission } from '../application/permission/user.permission'
import { StandardUserService } from '../application/standard-user.service'
import { UserQueryService } from '../application/user.query-service'
import { UserService } from '../application/user.service'
import { UserCreationValidation } from '../application/validation/user-creation.validation'
import { UserUpdateValidation } from '../application/validation/user-update.validation'
import { UserRepository } from '../domain/repository/user.repository'
import { UserController } from '../presentation/controller/user.controller'
import { EncrypteService } from '../infrastructure/service/encrypte.service'
import { BcryptService } from '../infrastructure/service/bcrypt.service'
import { StandardUserQueryService } from '../application/standard-user.query-service'
import { UserResourceConverter } from '../presentation/resource/converter/user-resource.converter'
import { CredentialResourceConverter } from '../presentation/resource/converter/credential-resource.converter'
import { TokenGeneratorService } from '../infrastructure/service/token-generator.service'
import { PrismaUserRepository } from '../infrastructure/database/prisma-user.repository'
import { PrismaClient } from '@prisma/client'

const userRepository: UserRepository = new PrismaUserRepository(
  new PrismaClient()
)
const userPermission: UserPermission = new UserPermission(userRepository)
const userCreationValidation: UserCreationValidation =
  new UserCreationValidation(userRepository)
const userUpdateValidation: UserUpdateValidation = new UserUpdateValidation(
  userRepository
)
const encrypteService: EncrypteService = new BcryptService()
const userService: UserService = new StandardUserService(
  userRepository,
  userPermission,
  userCreationValidation,
  userUpdateValidation
)
const userQueryService: UserQueryService = new StandardUserQueryService(
  userRepository,
  userPermission,
  encrypteService
)
const userResouceConvert: UserResourceConverter = new UserResourceConverter()
const credentialResourceConverter: CredentialResourceConverter =
  new CredentialResourceConverter()
const tokenGenaratorService: TokenGeneratorService = new TokenGeneratorService()

export const userController = new UserController(
  userService,
  userQueryService,
  userResouceConvert,
  credentialResourceConverter,
  tokenGenaratorService
)
