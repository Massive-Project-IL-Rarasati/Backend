import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { query } from "../database/db.js";
import dotenv from "dotenv";

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const result = await query("SELECT * FROM User WHERE id = ?", [payload.id]);
        if (result.length === 0) {
            return done(null, false);
        }
        const user = result[0];
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

export default strategy;
