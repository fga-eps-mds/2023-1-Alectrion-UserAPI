import { dataSource } from '../db/config'
import { User } from '../db/entities/user'
import { Role } from '../db/entities/userEnum/role'
import { Job } from '../db/entities/userEnum/job'
import { Repository } from './protocol/repository'

class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async findToAuthenticate(userInput: string): Promise<User> {
    const userPassword = await this.userRepository.find({
      where: [{ username: userInput }, { email: userInput }], // Encontrando o usuário pelo nome ou email.
      select: ['password', 'email', 'name', 'id', 'role', 'job'] // Retornando somente o que está entre as chaves.
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

  async findAll(): Promise<any> {
    const users = await this.userRepository.find({
      where: { isDeleted: false }
    })
    return users
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

  async createUser(params: {
    name: string
    email: string
    username: string
    job: Job
    role: Role
    password: string
  }): Promise<User | undefined> {
    const { name, email, password, username, job, role } = params

    const user = this.userRepository.create({
      name,
      email: email !== '' ? email : undefined,
      password,
      username,
      job: job ?? Job.GENERICO,
      role: role ?? Role.BASICO
    })

    await this.userRepository.save(user)
    return user
  }
}

export default UserRepository
