import { Service } from "typedi";
import User, { IUser } from "../models/User";

@Service()
class UserRepository {

  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async getUser(id:string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user;
  }

  public async createUser(data:any): Promise<IUser> {
    const user = new User(data); 
    await user.save();
    return user;
  }

  public async updateUser(id: string, update:any): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, update, {new: true});
    return user;
  }

  public async removeUser(id: string): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default UserRepository;
