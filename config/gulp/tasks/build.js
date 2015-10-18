import Gulp from 'gulp';
import Path from 'path';
import nib from 'nib';

import PATHS from '../../paths';
import {
	stylus,
	minifyCss,

	babel,
	uglify,

	plumber,
	util,
	debug,
	rename
} from '../plugins';

export default class Build {
	css(done) {
		return Gulp.src('**/*.css.styl', {
			cwd: PATHS.SRC
		})
			.pipe(plumber())
			.pipe(stylus({
				use: [nib()],
				import: ['nib'],
				compress: true,
				'include css': true,
			}))
			.pipe(minifyCss())
			.pipe(rename((path) => {
				path.basename = path.basename.replace(/\.css$/, '');
			}))
			.pipe(Gulp.dest(PATHS.DEST))
			.pipe(debug({
				title: util.colors.cyan('build:css ') + util.colors.white('built')
			}));
	}

	js(done) {
		return Gulp.src('**/*.js', {
			cwd: PATHS.SRC
		})
			.pipe(plumber())
			.pipe(babel({
				stage: 0
			}))
			.pipe(uglify())
			.pipe(Gulp.dest(PATHS.DEST))
			.pipe(debug({
				title: util.colors.cyan('build:js ') + util.colors.white('built')
			}));
	}

	html(done) {
		return Gulp.src('**/*.html', {
			cwd: PATHS.SRC
		})
			.pipe(plumber())
			.pipe(Gulp.dest(PATHS.DEST))
			.pipe(debug({
				title: util.colors.cyan('build:html ') + util.colors.white('built')
			}))
	}
}
