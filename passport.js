const passport = require('passport')

const User = require('./database/user')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random String';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = (await User.getUserById(jwt_payload.id))[0]
        if (user) {
            return done(null, user);
        }
        
        return done(null, false);
        
    } catch (err) {
        return done(err, false);
    }

}));