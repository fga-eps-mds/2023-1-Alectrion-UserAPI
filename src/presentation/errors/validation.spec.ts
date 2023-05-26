import { RequiredFieldError } from './validation'

describe('RequiredFieldError', () => {
  it('should set the correct name and message when fieldName is not provided', () => {
    const requiredFieldError = new RequiredFieldError()

    expect(requiredFieldError.name).toBe('RequiredFieldError')
    expect(requiredFieldError.message).toBe('Field required')
  })

  it('should set the correct name and message when fieldName is provided', () => {
    const fieldName = 'username'
    const requiredFieldError = new RequiredFieldError(fieldName)

    expect(requiredFieldError.name).toBe('RequiredFieldError')
    expect(requiredFieldError.message).toBe(
      `The field ${fieldName} is required`
    )
  })
})
