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
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  username: string

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

  @Column()
  password: string

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt: Date
}
