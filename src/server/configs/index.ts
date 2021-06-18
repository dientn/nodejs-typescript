import env from '../helpers/environment';

const config = {
    databaseUri: env.getAsString('DATABASE_URI'),
    Jwt: {
        secret: env.getAsString('JWT_SECRET ', 'nodejs_app'),
        expiresIn: env.getAsString('JWT_EXPIRES_IN', '2h'),
    },
    server: {
        port: env.getAsNumber('PORT', 3000)
    }
}

export default config