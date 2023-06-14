import { Job } from './job'
import { Role } from './role'

export class User {
  private id: string
  private cpf: string
  private username: string
  private name: string
  private password: string
  private email: string
  private job: Job
  private role: Role
  private isDeleted: boolean
  private firstAccess: boolean
  private createdAt: Date
  private updatedAt: Date

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

  public getJob(): Job {
    return this.job
  }

  public setJob(job: Job): void {
    this.job = job
  }

  public getRole(): Role {
    return this.role
  }

  public setRole(role: Role): void {
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

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt
  }
}
