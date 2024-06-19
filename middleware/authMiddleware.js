import passport from 'passport';
import jwtStrategy from '../config/passportConfig.js';

passport.use(jwtStrategy);

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export default authMiddleware;