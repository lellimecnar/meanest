import Express from 'express';
import Path from 'path';

import {API_ROUTE} from '~/config/paths';

let App = new Express();

import compress from 'compression';

App.use(compress({
	level: 9
}));

import logger from 'morgan';

App.use(logger('combined', {
	skip(req, res) {
		return req.statusCode < 400
	}
}));

import favicon from 'express-favicon';

App.use('/', favicon('./ui-src/favicon.ico'));

App.use('/', Express.static('./pub'));

import Db from '~/config/db';
import connMongo from 'connect-mongo';
import session from 'express-session';

let MongoStore = connMongo(session);

App.use(API_ROUTE, session({
		secret: 'this is super secret...',
		saveUninitialized: false,
		resave: false,
		store: new MongoStore({
			mongooseConnection: Db
		})
	}));

import {urlencoded} from 'body-parser';

App.use(API_ROUTE, urlencoded({extended:true}));

import Auth from '~/config/auth';

App.use(API_ROUTE, Auth.initialize())
	.use(API_ROUTE, Auth.session());

import ApiRouter from '~/config/api';
// console.log(ApiRouter.stack.map((r) => {
// 	return [r.route.path, Object.keys(r.route.methods)];
// }));

App.use(API_ROUTE, ApiRouter);

export default App;
