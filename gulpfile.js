// Initialize modules
const {
	src,
	dest,
	watch,
	series
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const imagemin = require("gulp-imagemin");
const gulpFont = require("gulp-font");
const browsersync = require('browser-sync').create();


//image minimizer
function imgTask() {
	return src('app/assets/images/*')
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}, {
			verbose: true
		}))
		.pipe(dest('dist', {
			sourcemaps: '/images'
		}));
}

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', {
			sourcemaps: true
		})
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', {
			sourcemaps: '.'
		}));
}

// JavaScript Task
function jsTask() {
	return src('app/js/script.js', {
			sourcemaps: true
		})
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(terser())
		.pipe(dest('dist', {
			sourcemaps: '.'
		}));
}

function fontTask() {
	return src('app/assets/fonts/*', {
			sourcemaps: true
		})
		.pipe(dest('dist/assets/.'));
}





// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}



function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/assets/image/*', 'app/scss/**/*.scss', 'app/**/*.js', 'app/assets/fonts/*}'],
		series(imgTask, scssTask, jsTask, fontTask, browserSyncReload, )
	);
}

// Default Gulp Task
exports.default = series(imgTask, scssTask, jsTask, fontTask, browserSyncServe, watchTask);