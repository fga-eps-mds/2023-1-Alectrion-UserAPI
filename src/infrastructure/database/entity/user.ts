import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Job } from '../../../domain/entity/job'
import { Role } from '../../../domain/entity/role'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  cpf: string

  @Column()
  username: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ nullable: true, unique: true })
  email: string

  @Column({
    type: 'enum',
    enum: Job,
    default: Job.GENERIC
  })
  job: Job

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.BASIC
  })
  role: Role

  @Column({
    type: 'boolean',
    default: false
  })
  isDeleted?: boolean

  @Column({
    type: 'boolean',
    default: true
  })
  firstAccess?: boolean

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt?: Date

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt?: Date
}
