/* this is connect for our project */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith'),
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps');

/* task for compilation sass to css */
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded',}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(livereload({ start: true }));
});

/* task for compilation and minimization *.js (CHANGING) */
gulp.task('js', function () {
    return gulp.src([
        'app/libs/jquery.magnific-popup.min.js',                    /* (CHANGING) */
        'app/libs/slick.min.js',                                    /* (CHANGING) */
        'app/js/common.js'                                          /* (CHANGING) */
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(livereload({ start: true }));
});

/* task for automatic compilation sass to css */
gulp.task('watch', ['css-libs', 'js'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/js/common.js', ['js']);
});

/* task for compilation to min.css (libs) */
gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('app/css'))
});

/* task for compilation to min.css (main) */
gulp.task('css-main', ['css-libs'], function () {
    return gulp.src('app/css/main.css')
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('app/css'))
});

/* dell all the files at folder of dist */
gulp.task('clean', function () {
    return del.sync('dist')
});

/* task for production (CHANGING) */
gulp.task ('build', ['clean', 'css-main'], function () {
    var buildCss = gulp.src([
        'app/css/*.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var buildApach = gulp.src('app/.htaccess')
        .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));
});

/* final for comfort */
gulp.task('default', ['watch']);

/* task for create sprite (*.pmg) */
// gulp.task('sprite', function() {
//     var spriteData = gulp.src('app/img/png/*.*')
//         .pipe(spritesmith({
//             imgName: 'sprite.png',
//             cssName: '_sprite.sass',
//             cssFormat: 'sass',
//             algorithm: 'binary-tree',
//             imgPath: '../img/sprite.png'
//         }));
//     spriteData.img.pipe(gulp.dest('app/img'));
//     spriteData.css.pipe(gulp.dest('app/sass'));
// });