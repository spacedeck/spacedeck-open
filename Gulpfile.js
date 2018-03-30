var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('gulp-express');
var nodemon = require('gulp-nodemon');
var revReplace = require("gulp-rev-replace");
var clean = require('gulp-clean');

var child_process = require('child_process');
var path = require('path');
var uglify = require('gulp-uglify');
var fingerprint = require('gulp-fingerprint');
var rev = require('gulp-rev');

var revAll = require('gulp-rev-all');

gulp.task('rev', () => {
  return gulp.src(['public/**'])
    .pipe(gulp.dest('build/assets'))
    .pipe(revAll.revision())
    .pipe(gulp.dest('build/assets'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('build/assets'));
});

gulp.task("all", ["styles", "uglify", "rev", "copylocales"], function(){
  var manifest = gulp.src("./build/assets/rev-manifest.json");
  return gulp.src("./views/**/*")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest("./build/views"));
});

gulp.task('copylocales', function(){
  return gulp.src('./locales/*.js').pipe(gulp.dest('./build/locales'));
});

gulp.task('clean', function () {
  return gulp.src('./build').pipe(clean());
});

gulp.task('styles', function() {
  gulp.src('styles/**/*.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('./public/stylesheets/'))
    .pipe(concat('style.css'));
});

gulp.task('uglify', () => {
  child_process.exec('sed -n \'s/.*script minify src="\\(.*\\)".*/.\\/public\\/\\1/p\' views/spacedeck.html',
    function (error, stdout, stderr) {
      var scripts = stdout.split('\n').map(function(p){return path.normalize(p)}).filter(function(p){return p!='.'});
      console.log("scripts: ",scripts);

      gulp.src(scripts)
        .pipe(uglify({output:{beautify:true}}))
        .pipe(concat('spacedeck.js'))
        .pipe(gulp.dest('public/javascripts'));
    });
});
