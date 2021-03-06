const { src, dest, watch, parallel, series } = require('gulp')

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function scripts(){
  return src(['node_modules/jquery/dist/jquery.js', 'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles(){
  return src("app/scss/*.scss")
    .pipe(scss({ outputStyle: "compressed" })) // use 'expanded' for no min
    .pipe(concat("styles.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching(){
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function images(){
  return src('app/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
    ]))
    .pipe(dest('dist/images'))
}

function clear(){
  return del('dist/**/*')
}

function build(){
  return src(
    [
      "app/*.html",
      "app/js/main.min.js",
      "app/css/reset.css",
      "app/css/styles.min.css",
      "app/fonts/**/*",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}
exports.scripts         = scripts;
exports.styles          = styles;
exports.watching        = watching;
exports.browsersync     = browsersync;
exports.images          = images;
exports.clear           = clear;

exports.default         = parallel(scripts, styles, browsersync, watching);

exports.build           = series(clear, images, build);