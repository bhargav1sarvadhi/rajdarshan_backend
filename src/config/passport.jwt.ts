import dotenv from 'dotenv';
dotenv.config();
import { db } from '../model';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { ERRORTYPES, MODEL, RES_TYPES } from '../constant';
import { logger } from '../logger/logger';
import { AppError } from '../utils';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECERET,
};

export default passport.use(
    new Strategy(opts, async function (jwtPayload, done) {
        try {
            const user = await db[MODEL.USER].findOne({
                where: { id: jwtPayload.id },
            });
            if (user) {
                return done(null, user);
            } else {
                return done(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                    false,
                );
            }
        } catch (error) {
            return done(error, false);
        }
    }),
);

class Token {
    async createToken(payload, next) {
        try {
            const expiresIn = '365d';
            const token = jwt.sign(payload, process.env.JWT_SECERET, {
                algorithm: 'HS256',
                expiresIn,
            });
            return token;
        } catch (error) {
            return next(error);
        }
    }

    async decodeToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECERET);
            return decoded;
        } catch (error) {
            logger.info('decode token in error', error);
        }
    }
}

export const TokenController = new Token();
