import env from '../helpers/environment';

const config = {
    databaseUri: env.getAsString('DATABASE_URI'),
    passport: {
        secret: env.getAsString('SECRET_KEY', 'nodejs_app'),
        expiresIn: 10000,
    },
    server: {
        port: env.getAsNumber('PORT', 3000)
    }
}

export default config