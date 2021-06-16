
import passport from "passport";
import { Strategy , ExtractJwt} from 'passport-jwt';
import config from './index';

passport.use(
  new Strategy (
    { ...config.passport,
      jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token: { user: any; }, done: (arg0: null, arg1?: undefined) => void) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);