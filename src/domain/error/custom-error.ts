export class CustomError extends Error {
  public readonly statusCode: number

  public constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
