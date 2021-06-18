
import passport from "passport";
import { Strategy , ExtractJwt} from 'passport-jwt';
import config from './index';

passport.use(
  new Strategy (
    { 
      secretOrKey: config.Jwt.secret ,
      jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload: any, done: (arg0: null, arg1?: undefined) => void) => {
        if(payload.user){
            return done(null, payload.user);
        }
        else{
            return done(null);
        }
    }
  )
);