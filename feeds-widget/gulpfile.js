var gulp = require('gulp');
var minifyJs = require('gulp-uglify');
var concat = require('gulp-concat');

const jsFiles = [
    './js/models/deviceTypes.enum.js', 
    './js/models/feedViewTypes.enum.js',
    './js/models/feed.js',
    './js/feedFactory.js',
    './js/feedHtmlFactory.js',
	'./js/main.js',
]; 
function bundleJs() {
    return gulp.src(jsFiles)
    .pipe(minifyJs())
    .pipe(concat('/js/bundle.js'))
    .pipe(gulp.dest('../dist/'));
}

function copyCss() {
    return gulp.src('./style/*.css')
        .pipe(gulp.dest('../dist/style/'));
}

exports.deploy = gulp.series(bundleJs, copyCss);
