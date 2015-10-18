import {controller, get, post, middleware} from 'express-decorators';
import {authenticate} from '~/config/auth';
import User from '~/db/user';

@controller('/users')
export default class Users {
	@get('')
	getUser(req, res, next) {
		if (req.user) {
			return res.json(req.user.cleanObj());
		}

		res.status(401).json({err: 'Not logged in'});
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
				return res.json(user);
			});
		})
	}

	@post('/login')
	@authenticate
	login(req, res, next) {
		res.json(req.user.cleanObj());
	}

	@post('/logout')
	logout(req, res, next) {
		req.session.destroy((err) => {
			if (err) { next(err); }
			res.json({msg: 'Logged out'});
		});
	}
}
