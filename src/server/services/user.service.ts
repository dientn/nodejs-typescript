import { Service } from "typedi";
import { IUser } from "../models/User";
import UserRepository from "../repositories/user.repository";

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.userRepository.getAllUsers();
    return result;
  }

  public async getUserByEmail(email:string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  public async getUser(id: string): Promise<IUser | null> {
    const result = await this.userRepository.getUser(id);
    return result;
  }

  public async createUser(id: string): Promise<IUser | null> {
    const result = await this.userRepository.createUser(id);
    return result;
  }

  public async removeUser(id: string): Promise<IUser | null> {
    const user = await this.userRepository.removeUser(id);
    return user;
  }

  public async updateUser(id: string, update:any): Promise<IUser | null> {
    const result = await this.userRepository.updateUser(id, update);
    return result;
  }
}

export default UserService;
