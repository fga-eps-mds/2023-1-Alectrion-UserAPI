import { datatype } from 'faker'
import { mock } from 'jest-mock-extended'
import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'
import { User } from '../../domain/entities/user'
import { Repository } from '../../repository/protocol/repository'
import {
  DeleteUserData,
  DeleteUserError,
  DeleteUserUseCase,
  UserNotFoundError
} from './deleteUserUseCase'

const repositoryMocked = mock<Repository>()
const deleteUserUseCase = new DeleteUserUseCase(repositoryMocked)

const mockedUser: User = {
  id: datatype.string(),

  name: datatype.string(),

  email: datatype.string(),

  username: datatype.string(),

  cpf: datatype.string(),

  job: Job.DELEGADO,

  role: Role.ADMIN,

  password: datatype.string(),

  createdAt: new Date(),

  updatedAt: new Date(),

  temporarypassword: false
}

describe('Should test conditions for soft delete', () => {
  it('Should succesfully delete a user', async () => {
    repositoryMocked.findOne.mockResolvedValue(mockedUser)
    repositoryMocked.deleteOne.mockResolvedValue()
    const deleteUserData: DeleteUserData = {
      userId: datatype.uuid()
    }

    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Usuário deletado com sucesso' }
    }

    const deleteUserResult = await deleteUserUseCase.execute(deleteUserData)
    expect(deleteUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.deleteOne).toHaveBeenCalledTimes(1)
  })

  it('Should fail when user not found.', async () => {
    const deleteUserData = {}

    const expectedResponse = {
      isSuccess: false,
      error: new UserNotFoundError()
    }
    const deleteUserResult = await deleteUserUseCase.execute(deleteUserData)
    expect(deleteUserResult).toEqual(expectedResponse)
  })

  it('Should fail when update user.', async () => {
    const deleteUserData = { userId: datatype.string() }

    const expectedResponse = {
      isSuccess: false,
      error: new DeleteUserError()
    }
    repositoryMocked.findOne.mockResolvedValue(mockedUser)
    repositoryMocked.deleteOne.mockRejectedValue(null)
    const deleteUserResult = await deleteUserUseCase.execute(deleteUserData)
    expect(deleteUserResult).toEqual(expectedResponse)
  })
})
