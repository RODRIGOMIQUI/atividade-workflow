var gulp = require('gulp');
var del  = require('del');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

// APAGAR DIRETORIOS
gulp.task('apagar-css', function () {
	del('./dist/css/*.css');
});

// APAGAR HTML
gulp.task('apagar-html', function () {
	del('./dist/*.html');
});

// COMPILAR E MOVER CSS
gulp.task('compilar-css', ['apagar-css'], function () {
  return gulp.src('./source/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// MINIFICAR HTML
gulp.task('minificar-html', ['apagar-html'], function() {
  return gulp.src('./source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});


// TAREFAS AUTOMATICAS
gulp.task('verificar-mudancas-css', function() {
	gulp.watch('source/scss/*.scss', ['compilar-css']);
});

gulp.task('verificar-mudancas-html', function() {
	gulp.watch('source/index.html', ['minificar-html']);
});


// INICIALIZAÇÃO DAS TAREFAS
gulp.task('default', ['verificar-mudancas-css', 'verificar-mudancas-html']);
