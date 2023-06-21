export class NewCredential {
  private userId: string
  private oldPassword: string
  private newPassword: string

  public getUserId(): string {
    return this.userId
  }

  public setUserId(userId: string): void {
    this.userId = userId
  }

  public getOldPassword(): string {
    return this.oldPassword
  }

  public setOldPassword(oldPassword: string): void {
    this.oldPassword = oldPassword
  }

  public getNewPassword(): string {
    return this.newPassword
  }

  public setNewPassword(newPassword: string): void {
    this.newPassword = newPassword
  }
}
