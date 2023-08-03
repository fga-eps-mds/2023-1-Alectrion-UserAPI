import { dataSource } from '../db/config'
import { User } from '../db/entities/user'
import { Role } from '../db/entities/userEnum/role'
import { Job } from '../db/entities/userEnum/job'
import { Query, Repository } from './protocol/repository'
import { ILike } from 'typeorm'

class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async findToAuthenticate(userInput: string): Promise<User> {
    const userPassword = await this.userRepository.find({
      where: [
        { username: userInput },
        { email: userInput },
        { cpf: userInput }
      ], // Encontrando o usuário pelo nome ou email ou cpf.
      select: [
        'password',
        'email',
        'name',
        'id',
        'role',
        'job',
        'cpf',
        'temporarypassword',
        'isDeleted'
      ] // Retornando somente o que está entre as chaves.
    })
    return userPassword[0]
  }

  async updateOne(userData: any): Promise<boolean> {
    const updateUserData = Object.assign({}, userData)
    delete updateUserData.userId
    await this.userRepository.update(userData.userId, updateUserData)
    return true
  }

  async deleteOne(userId: string): Promise<void> {
    console.log('Deletou: ', userId)
    await this.userRepository.update(userId, {
      isDeleted: true,
      deletedAt: new Date()
    })
  }

  async findOne(userId: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      isDeleted: false
    })
    if (!user) {
      return null
    }
    return user
  }

  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email,
      isDeleted: false
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async findAll(query: Query): Promise<any> {
    const { role, job, search, deletedUsers, take, skip } = query
    const defaultConditions = {
      role,
      job,
      isDeleted: deletedUsers
    }

    let searchConditions
    if (typeof search !== 'undefined') {
      searchConditions = [
        {
          username: ILike(`%${search}%`),
          ...defaultConditions
        },
        {
          cpf: ILike(`%${search}%`),
          ...defaultConditions
        }
      ]
    } else searchConditions = defaultConditions

    const queryResult = await this.userRepository.find({
      order: { updatedAt: 'DESC' },
      where: searchConditions,
      take,
      skip
    })

    return queryResult
  }

  async findOneByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      username,
      isDeleted: false
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async findOneByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      cpf,
      isDeleted: false
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async createUser(params: {
    name: string
    email: string
    username: string
    cpf: string
    job: Job
    role: Role
    password: string
    temporaryPassword: boolean
  }): Promise<User | undefined> {
    const {
      name,
      email,
      password,
      username,
      cpf,
      job,
      role,
      temporaryPassword
    } = params

    const user = this.userRepository.create({
      name,
      email: email !== '' ? email : undefined,
      password,
      username,
      cpf,
      job: job ?? Job.GENERICO,
      role: role ?? Role.BASICO,
      temporarypassword: temporaryPassword
    })
    await this.userRepository.save(user)
    return user
  }
}

export default UserRepository
