import {
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError
} from './http'

describe('ServerError', () => {
  it('should set the correct name and message', () => {
    const error = new Error('Internal server error')
    const serverError = new ServerError(error)

    expect(serverError.name).toBe('ServerError')
    expect(serverError.message).toBe('Server failed. Try again soon')
    expect(serverError.stack).toBe(error.stack)
  })
})

describe('UnauthorizedError', () => {
  it('should set the correct name and message', () => {
    const unauthorizedError = new UnauthorizedError()

    expect(unauthorizedError.name).toBe('UnauthorizedError')
    expect(unauthorizedError.message).toBe('Unauthorized')
  })
})

describe('ForbiddenError', () => {
  it('should set the correct name and message', () => {
    const forbiddenError = new ForbiddenError()

    expect(forbiddenError.name).toBe('ForbiddenError')
    expect(forbiddenError.message).toBe('Access denied')
  })
})

describe('BadRequestError', () => {
  it('should set the correct name and message', () => {
    const errorMessage = 'Invalid request'
    const badRequestError = new BadRequestError(errorMessage)

    expect(badRequestError.name).toBe('ForbiddenError')
    expect(badRequestError.message).toBe(errorMessage)
  })
})
