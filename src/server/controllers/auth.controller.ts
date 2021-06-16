import { Service } from "typedi";
import jwt from 'jsonwebtoken';
import UserService from "../services/user.service";
import config from '../configs/index';

@Service()
class AuthController {
  constructor(private readonly userService: UserService) { }

  public async signup (req: any, res: any) {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json({
        user
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  public async login (req: any, res: any) {
    const { email, password } = req.body;
    if (email && password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        if (user?.password === password) {
            let payload = { id: user?._id };
            let token = jwt.sign(payload, config.passport.secret);
            res.json({ msg: 'ok', token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
  }
}

export default AuthController;
