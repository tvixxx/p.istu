var gulp = require('gulp'),
    jade = require('gulp-jade'),
    config = require('../config.json'),
    environmentVariable = require('../environment-variable'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect');

gulp.task('php', function() {

    var livereload = environmentVariable.getLive(),
        markup_path = '**/*.php';

    return gulp.src(config.src + '/php/' + markup_path)
        .pipe(gulp.dest(config.dest + '/php'))
        .pipe(gulpif(livereload, connect.reload()));
});
