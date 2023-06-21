import { Job, PrismaClient, Role } from '@prisma/client'
import { User } from '../../domain/entity/user'
import { UserRepository } from '../../domain/repository/user.repository'
import { UserDataMapper } from './datamapper/user.datamapper'
import { NewCredential } from '../../domain/entity/new-credential'

export class PrismaUserRepository implements UserRepository {
  public constructor(
    public readonly prisma: PrismaClient,
    public readonly userDataMapper: UserDataMapper
  ) {}

  public async save(user: User): Promise<User> {
    return await this.prisma.user
      .create({
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
      .then((it) => this.userDataMapper.convertTo(it))
  }

  public async update(user: User): Promise<User> {
    return await this.prisma.user
      .update({
        where: {
          id: user.getId()
        },
        data: {
          cpf: user.getCpf(),
          username: user.getUsername(),
          name: user.getName(),
          password: user.getPassword(),
          email: user.getEmail(),
          job: user.getJob() as unknown as Job,
          role: user.getRole() as unknown as Role,
          isDeleted: user.getIsDeleted(),
          firstAccess: user.getFirstAccess(),
          updatedAt: new Date(Date.now())
        }
      })
      .then((it) => this.userDataMapper.convertTo(it))
  }

  public async delete(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isDeleted: true,
        updatedAt: new Date(Date.now())
      }
    })
  }

  public async findAllWithIsDeletedFalse(): Promise<User[]> {
    return await this.prisma.user
      .findMany({
        where: {
          isDeleted: false
        }
      })
      .then((it) => it.map((elem) => this.userDataMapper.convertTo(elem)))
  }

  public async findByIdAndIsDeletedFalse(userId: string): Promise<User> {
    return await this.prisma.user
      .findFirst({
        where: {
          id: userId,
          isDeleted: false
        }
      })
      .then((it) => this.userDataMapper.convertTo(it))
  }

  public async findByUsernameAndIsDeletedFalse(
    username: string
  ): Promise<User> {
    return await this.prisma.user
      .findFirst({
        where: {
          username,
          isDeleted: false
        }
      })
      .then((it) => this.userDataMapper.convertTo(it))
  }

  public async saveNewPassword(newCredential: NewCredential): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: newCredential.getUserId()
      },
      data: {
        password: newCredential.getNewPassword(),
        updatedAt: new Date(Date.now())
      }
    })
  }

  public async existsByUserId(userId: string): Promise<boolean> {
    return !!(await this.prisma.user.findFirst({
      where: {
        id: userId,
        isDeleted: false
      }
    }))
  }
}
