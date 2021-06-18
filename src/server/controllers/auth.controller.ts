import { Service } from "typedi";
import jwt from 'jsonwebtoken';
import UserService from "../services/user.service";
import config from '../configs/index';
// import express from 'express';

@Service()
class AuthController {
  constructor(private readonly userService: UserService) { }

  public async signup (req: any, res: any) {
    try {
      const { email } = req.body;
      const exists = await this.userService.getUserByEmail(email);

      if(exists){
        return res.status(400).json({ error: 'User existed' });
      }

      const user = await this.userService.createUser(req.body);
      let payload = { user : { id: user?._id, email } };
      const token = jwt.sign(payload, config.Jwt.secret, {expiresIn : config.Jwt.expiresIn});
      const userToReturn = { ...user?.toJSON(), token, password : undefined};
      return res.status(201).json(userToReturn);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  public async login (req: any, res: any) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ error: 'Email or Password is required' });
    }

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Email not existed' });
    }
    
    if (await user?.isValidPassword(password)) {
        let payload = { user : { id: user?._id, email } };
        let token = jwt.sign(payload, config.Jwt.secret, {expiresIn : config.Jwt.expiresIn});
        let userToReturn = { ...user?.toJSON(), token, password: undefined }
        res.json(userToReturn);
    } else {
        res.status(401).json({ error: 'Password is incorrect' });
    }
    
  }

  public async profile (req: any, res: any) {
    return res.json(req.user)
  }
}

export default AuthController;
