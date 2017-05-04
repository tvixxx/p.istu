var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    environmentVariable = require('../environment-variable'),
    merge = require('merge-stream'),
    config = require('../config.json'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('js', ['html'], function(){

    var is_prod = environmentVariable.getEnv(),
        livereload = environmentVariable.getLive(),
        assets = useref.assets(),
        use_ref_stream,
        copy_js_stream,
        copy_bower_stream,
        copy_babel_polyfill;

    // for prod
    use_ref_stream = gulpif(is_prod, gulp.src(config.dest + '/*.html'))
        .pipe(assets)
        .pipe(sourcemaps.init())
        .pipe(babel({
            compact: true,
            presets: ['es2015', 'stage-0'],
            plugins: ["es6-promise"],
            ignore: [
                'vendor.min.js',
                'polyfill.min.js'
            ]
        }))
        .pipe(gulpif('*.main.min.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../../web/'}))
        .pipe(gulp.dest(config.dest));

    // for dev
    copy_js_stream = gulp.src(config.src + '/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['es6-promise']
        }))
        .pipe(gulpif(!is_prod, gulp.dest(config.dest + '/js')))
        .pipe(sourcemaps.write('.'))
        .pipe(gulpif(livereload, connect.reload()));

    copy_bower_stream = gulp.src('./bower_components/**/*.js')
        .pipe(gulpif(!is_prod, gulp.dest(config.dest + '/bower_components')));

    copy_babel_polyfill = gulp.src('./node_modules/babel-polyfill/dist/polyfill.js')
        .pipe(gulpif(!is_prod, gulp.dest(config.dest + '/node_modules/babel-polyfill/dist/')));


    if (is_prod) {
        return use_ref_stream;
    }

    return merge(copy_js_stream, copy_bower_stream, copy_babel_polyfill);


});
