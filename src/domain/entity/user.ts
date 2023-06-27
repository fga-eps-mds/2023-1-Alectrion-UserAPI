import { Job } from './job'
import { Role } from './role'

export class User {
  public id: string
  public cpf: string
  public username: string
  public name: string
  public password: string
  public email: string
  public job: Job
  public role: Role
  public isDeleted: boolean
  public firstAccess: boolean
  public createdAt: Date
  public updatedAt: Date

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
