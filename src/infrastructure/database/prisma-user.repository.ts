import { Job, PrismaClient, Role } from '@prisma/client'
import { User } from '../../domain/entity/user'
import { UserRepository } from '../../domain/repository/user.repository'

export class PrismaUserRepository implements UserRepository {
  public constructor(public readonly prisma: PrismaClient) {}

  public async save(user: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        cpf: user.getCpf(),
        username: user.getUsername(),
        name: user.getName(),
        password: user.getPassword(),
        email: user.getEmail(),
        job: user.getJob() as unknown as Job,
        role: user.getRole() as unknown as Role,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    })

    /* Adicionar data maper */
  }

  delete(userId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findAllWithIsDeletedFalse(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findByIdAndIsDeletedFalse(userId: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findByUsernameAndIsDeletedFalse(username: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
