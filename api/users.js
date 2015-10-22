import Auth, {authorize} from '~/config/auth';
import {controller, get, post} from '~/config/api';
import User from '~/db/user';

@controller('/users')
export default class Users {
	@get('/me')
	@authorize
	getUser(req, res, next) {
		res.json(req.user.cleanObj());
	}

	@post('')
	register(req, res, next) {
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) { return next(err); }
			if (user) {
				return res.status(409).json({err: 'Username already exists'});
			}

			user = new User(req.body);

			user.save((err) => {
				if (err) { return next(err); }

				req.logIn(user, (err) => {
					if (err) { return next(err); }
					return res.json(user.cleanObj());
				});
			});
		})
	}

	@post('/login')
	login(req, res, next) {
		Auth.authenticate('local', (err, user, info) => {
			if (err) { return next(err); }

			if (!user) { return res.json(info); }

			req.logIn(user, (err) => {
				if (err) { return next(err); }
				return res.json(user.cleanObj());
			});
		})(req, res, next);
	}

	@post('/logout')
	logout(req, res, next) {
		req.session.destroy((err) => {
			if (err) { return next(err); }
			res.json({msg: 'Logged out'});
		});
	}
}
