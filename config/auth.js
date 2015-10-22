import Passport from 'passport';
import LocalStrategy from 'passport-local';
import {middleware} from 'express-decorators';

import User from '~/db/user';

Passport.use('local', new LocalStrategy({
		passReqToCallback: true
	}, (req, username, password, next) => {
		User.findOne({username}, (err, user) => {
			if (err) { return next(err); }
			if (!user) { return next(null, false, {err: 'Invalid username'}); }

			user.verifyPassword(password, (err, valid) => {
				if (err) return next(err);
				if (!valid) return next(null, false, {err: 'Incorrect password'});

				next(null, user);
			});
		})
	})
);

Passport.serializeUser((user, next) => {
	next(null, user._id);
});

Passport.deserializeUser((id, next) => {
	User.findById(id, (err, user) => {
		next(err, user);
	});
});

export default Passport;

export var authorize = middleware((req, res, next) => {
	if (req.isAuthenticated()) { return next(); }

	res.status(401).json({err:'Not logged in'}).end();
});
