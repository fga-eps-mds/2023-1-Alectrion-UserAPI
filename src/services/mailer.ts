export interface MailService {
  sendRecoverPasswordEmail(
    email: string,
    temporaryPassword: string
  ): Promise<boolean>
}
