import { Service } from "typedi";
import UserService from "../services/user.service";

@Service()
class UserController {
  constructor(private readonly userService: UserService) { }
  public async getAllUsers(_req: any, res: any, _next: () => void) {
    const users = await this.userService.getAllUsers();
    return res.status(200).json({users});
  }

  public async createUser (req: any, res: any) {
    try {
      const userCreated = await this.userService.createUser(req.body);
      let user = { ...userCreated?.toJSON() }
      delete user.password;
      
      return res.status(201).json({
        user
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  public async getUserById (req: any, res: any) {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUser(userId);
      let userToReturn = { ...user?.toJSON() }
      delete userToReturn.password;
      if (user) {
        return res.status(200).json({ user: userToReturn });
      }
      return res.status(404).send({ error: "User with the specified ID does not exists" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public async updateUser (req: any, res: any) {
    try {
      const { userId } = req.params;
      const updated = await this.userService.updateUser(userId, req.body);
      let user  = { ...updated?.toJSON() }
      delete user.password;
      if (updated) {
        return res.status(200).json({ user });
      }
      return res.status(404).send({error: "User not found"});
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  public async deleteUser  (req: any, res: any) {
    try {
      const { userId } = req.params;
      const deleted = await this.userService.removeUser(userId);
      if (deleted) {
        return res.status(204).send("User deleted");
      }
      return res.status(404).send({ error: "User not found" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default UserController;
