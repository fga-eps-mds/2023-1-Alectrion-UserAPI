import { mock } from 'jest-mock-extended'
import { Repository } from '../../repository/protocol/repository'
import {
  UpdateUserUseCase,
  UpdateUserError,
  UpdateUserData
} from './updateUserUseCase'
import { datatype } from 'faker'
import { Encryptor } from '../../infrastructure/service/encrypte.service'

const repositoryMocked = mock<Repository>()
const encryptorMock = mock<Encryptor>()
const updateUserUseCase = new UpdateUserUseCase(repositoryMocked, encryptorMock)

describe('Should test use case update user', () => {
  it('Should update use with success', async () => {
    repositoryMocked.updateOne.mockResolvedValue(true)
    const upadetUserData: UpdateUserData = {
      userId: datatype.uuid(),
      name: datatype.string(),
      password: datatype.string()
    }

    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Usuário atualizado!' }
    }
    const updateUserResult = await updateUserUseCase.execute(upadetUserData)
    expect(updateUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toHaveBeenCalledTimes(1)
  })

  it('Should fail when update user.', async () => {
    repositoryMocked.updateOne.mockResolvedValue(false)
    const upadetUserData: UpdateUserData = {
      userId: datatype.uuid(),
      name: datatype.string()
    }

    const expectedResponse = {
      isSuccess: false,
      error: new UpdateUserError()
    }
    const updateUserResult = await updateUserUseCase.execute(upadetUserData)
    expect(updateUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toHaveBeenCalledTimes(1)
  })
})
