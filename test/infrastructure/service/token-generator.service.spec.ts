import { TokenGeneratorService } from '../../../src/infrastructure/service/token-generator.service'
import * as jsonwebtoken from 'jsonwebtoken'
import { datatype } from 'faker'

jest.mock('jsonwebtoken')

describe('shoul test token adapter', () => {
  it('should return a token', () => {
    const mockedToken = datatype.string()
    const payload = datatype.string()
    const secret = datatype.string()
    const spySign = jest
      .spyOn(jsonwebtoken, 'sign')
      .mockImplementation((a, b, c) => {
        return mockedToken
      })
    const adapter = new TokenGeneratorService()
    const responseToken = adapter.generateToken(payload)
    expect(responseToken).toEqual(mockedToken)
    expect(spySign).toHaveBeenCalledWith(payload, secret, {})
  })
})
