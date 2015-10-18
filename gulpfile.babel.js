import Gulp from 'gulp';
import Path from 'path';

import Build from './config/gulp/tasks/build';
[
	Build
].forEach((cls) => {
	let prefix = cls.name.toLowerCase();

	Gulp.task(prefix, Object.getOwnPropertyNames(cls.prototype).filter((prop) => {
		return prop !== 'constructor';
	}).map((prop) => {
		let name = prefix + ':' + prop.toLowerCase();

		Gulp.task(name, cls.prototype[prop]);

		return name;
	}));
});

Gulp.task('default', (done) => {
	done();
});
