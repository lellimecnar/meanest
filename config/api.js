import Path from 'path';
import * as decorators from 'express-decorators';
import {snakeCase} from 'change-case';

Object.keys(decorators).forEach((key) => {
	module.exports[snakeCase(key)] = decorators[key];
});

import {Router} from 'express';
import {sync as glob} from 'glob';

import {API} from '~/config/paths';

let router = new Router();

glob('**/*.js', {
	cwd: API
}).forEach((filePath) => {
	let Ctrl = require(Path.join(API, filePath));

	new Ctrl().register(router);
});

export default router;
