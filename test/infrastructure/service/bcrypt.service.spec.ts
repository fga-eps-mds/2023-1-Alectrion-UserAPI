import { BcryptService } from '../../../src/infrastructure/service/bcrypt.service'
import { compareSync, hashSync } from 'bcrypt'

jest.mock('bcrypt')

const mockedDependency = jest.mocked(hashSync)
const mockedDependencyCompare = jest.mocked(compareSync)

describe('BcryptService', () => {
  let sut: BcryptService
  beforeEach(() => {
    sut = new BcryptService()
  })
  it('should call BcryptService with correct params', () => {
    mockedDependency.mockReturnValue('value')
    sut.encrypt('any_password')

    expect(mockedDependency).toHaveBeenCalledTimes(1)
    expect(mockedDependency).toHaveBeenCalledWith('any_password', 3)
  })

  it('should compare 2 passwords and return a true if it are the same', () => {
    const passwordLogin = '1234'
    const passwordDB = sut.encrypt(passwordLogin)
    sut.compare(passwordLogin, passwordDB)
    expect(mockedDependencyCompare).toHaveBeenCalledTimes(1)
    expect(mockedDependencyCompare).toHaveBeenCalledWith(
      passwordLogin,
      passwordDB
    )
  })
})
