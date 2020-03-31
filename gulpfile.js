const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const terser = require('gulp-terser');

//compile scss into css
// function style() {
//     // 1. where is my scss file
//     return gulp.src('./sass/**/*.scss')
//     // 2. pass the file through sass compiler
//     .pipe(sass().on('error', sass.logError))
//     // 3. where do i save the compiled CSS ?
//     .pipe(gulp.dest('./css'))
//     // 4. strem changes to all browsers
//     .pipe(browserSync.stream());
// }

//compile scss into css
let style = () => {
    // 1. where is my scss file
    return gulp.src('Starter-file/sass/**/*.scss')
        // 2. pass the file through sass compiler
        .pipe(sass().on('error', sass.logError))
        // 3. pass the file through autoprifixer
        .pipe(autoprefixer())
        // 4. pass the file through css minifier
        .pipe(cssnano())
        // 5. intilizing sourcemaps
        .pipe(sourcemaps.init())
        // 6. pass the files through sourcemaps ?
        .pipe(sourcemaps.write('.'))
        // 7. where do i save the compiled CSS ?
        .pipe(gulp.dest('Starter-file/dist/css'))
        // 8. stream changes to all browsers
        .pipe(browserSync.stream());
}

let userref = () => {
    return gulp.src('./pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(useref())
        .pipe(gulpIf('*.js', terser()))
        // 3. pass the file through css minifier
        // .pipe(gulpIf('*.css', cssnano()))

        .pipe(gulp.dest('Starter-file/dist'));
}
 

// let fileincludes = () => {
//     return gulp.src('./*.html')
//     .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//     }))
//     .pipe(gulp.dest('dist'));
// }

let imgminify = () => {
    return gulp.src('Starter-file/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            // Setting interlaced to true
            interlaced: true
        })))
        .pipe(gulp.dest('Starter-file/dist/images'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './Starter-file/dist'
        }
    });
    gulp.watch('./Starter-file/sass/**/*.scss', style);
    gulp.watch('./Starter-file/sass/**/*.scss', userref);
    gulp.watch('./Starter-file/pages/*.html', userref);
    gulp.watch('./Starter-file/includes/*.html', userref);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./Starter-file/js/**/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
exports.userref = userref;
exports.imgminify = imgminify;
// exports.fileincludes = fileincludes;
