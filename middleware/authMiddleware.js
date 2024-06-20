import passport from 'passport';
import jwtStrategy from '../config/passportConfig.js';
import Jwt from 'jsonwebtoken';

// passport.use(jwtStrategy);

const authMiddlewareUser =(req, res, next) => {
    
    // passport.authenticate('jwt', { session: false }, (err, user) => {
    //     console.log(err, user)
    //     if (err) {
    //         return next(err);
    //     }
    //     if (!user) {
    //         return res.status(401).json({ msg: 'Unauthorized' });
    //     }
    //     req.user = user;
    //     next();
    // })(req, res, next);
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    Jwt.verify(token, process.env.JWT_SECRET , (err , user ) => {
        console.log(user, err)
    if (user.role != "user" ) return res.sendStatus(401)

    if (err) return res.sendStatus(403)
    req.user = user

    next()
     })
};

const authMiddlewareAdmin =(req, res, next) => {
    
    // passport.authenticate('jwt', { session: false }, (err, user) => {
    //     console.log(err, user)
    //     if (err) {
    //         return next(err);
    //     }
    //     if (!user) {
    //         return res.status(401).json({ msg: 'Unauthorized' });
    //     }
    //     req.user = user;
    //     next();
    // })(req, res, next);
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    Jwt.verify(token, process.env.JWT_SECRET , (err , user ) => {
        console.log(user, err)
    if (user.role != "admin" ) return res.sendStatus(401)

    if (err) return res.sendStatus(403)
    req.user = user

    next()
     })
};

export {authMiddlewareAdmin, authMiddlewareUser}
