export class UserResource {
  private id: string
  private cpf: string
  private username: string
  private name: string
  private password: string
  private email: string
  private job: string
  private role: string
  private isDeleted: boolean
  private firstAccess: boolean

  public getId(): string {
    return this.id
  }

  public setId(id: string): void {
    this.id = id
  }

  public getCpf(): string {
    return this.cpf
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf
  }

  public getUsername(): string {
    return this.username
  }

  public setUsername(username: string): void {
    this.username = username
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public getJob(): string {
    return this.job
  }

  public setJob(job: string): void {
    this.job = job
  }

  public getRole(): string {
    return this.role
  }

  public setRole(role: string): void {
    this.role = role
  }

  public getIsDeleted(): boolean {
    return this.isDeleted
  }

  public setIsDeleted(isDeleted: boolean): void {
    this.isDeleted = isDeleted
  }

  public getFirstAccess(): boolean {
    return this.firstAccess
  }

  public setFirstAccess(firstAccess: boolean): void {
    this.firstAccess = firstAccess
  }
}
