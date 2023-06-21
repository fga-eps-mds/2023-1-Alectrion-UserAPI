import { MailerAdapter } from './mailerAdapter'
import nodemailer from 'nodemailer'

jest.mock('nodemailer')

describe('MailerAdapter Test', () => {
  const mailerAdapter = new MailerAdapter()

  test('should return true if email sent', async () => {
    const sendMailMock = jest.fn().mockResolvedValueOnce(true)
    const createTransportMock = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValueOnce({
        sendMail: sendMailMock
      } as any)

    const result = await mailerAdapter.sendRecoverPasswordEmail(
      'asd@gmail.com',
      '1d30da'
    )
    expect(result).toBe(true)
    expect(createTransportMock).toHaveBeenCalledTimes(1)
  })

  test('should return false if email not sent', async () => {
    const sendMailMock = jest.fn().mockRejectedValue(false)
    const createTransportMock = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValueOnce({
        sendMail: sendMailMock
      } as any)

    const result = await mailerAdapter.sendRecoverPasswordEmail(
      'asd@gmail.com',
      '1d30da'
    )
    expect(result).toBe(false)
    expect(createTransportMock).toHaveBeenCalledTimes(1)
  })
})
