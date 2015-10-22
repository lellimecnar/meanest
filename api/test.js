import {controller, get, param} from '~/config/api';
import {authorize} from '~/config/auth';

@controller('/test')
export default class Test {
	static $thing = 'test';

	constructor() {
		this.msg = 'it works';
	}

	@param('id')
	id_param(req, res, next, val) {
		req.id = val;
		next();
	}

	@get('/thing/:id(\\d+)')
	@authorize
	get_some_thing(req, res, next) {
		res.json({val: parseInt(req.id) * 100, msg: this.msg});
	}
}
