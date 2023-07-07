import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Job } from './userEnum/job'
import { Role } from './userEnum/role'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column({ nullable: true, unique: true })
  email: string

  @Column()
  username: string

  @Column()
  cpf: string

  @Column({
    type: 'enum',
    enum: Job,
    default: Job.GENERICO
  })
  job: Job

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.BASICO
  })
  role: Role

  @Column({ select: false })
  password: string

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt?: Date

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt?: Date

  @Column({ nullable: true })
  deletedAt?: Date

  @Column({
    type: 'boolean',
    default: true
  })
  temporarypassword: boolean

  @Column({
    type: 'boolean',
    default: false
  })
  isDeleted?: boolean
}
