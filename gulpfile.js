const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const CONFIG = require('./gulp.config');

const server = browserSync.create();
const serve = (done) => {
  server.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
};

const clean = () => {
  return del(['dist']);
};

const html = () => {
  return src(['views/pages/Homepage/index.pug'])
    .pipe(pug())
    .pipe(dest('dist'))
    .pipe(server.stream());
};

const css = () => {
  let tasks = CONFIG.CSS.map((config) => {
    return src(config.files)
      .pipe(cleanCSS())
      .pipe(concat(`${config.name}.inline.css`))
      .pipe(dest(config.dest))
      .pipe(server.stream());
  });
  return merge(tasks);
};

const images = () => {
  return src([
    'views/pages/Homepage/images/*.{png,jpg,webp}',
    'views/parts/Header/images/*.{png,jpg,webp}',
    'views/parts/Footer/images/*.{png,jpg,webp}',
  ])
    .pipe(dest('./dist/assets'))
    .pipe(server.stream());
};

const js = () => {
  return src(['views/parts/scripts/*.js'])
    .pipe(minify())
    .pipe(dest('./dist/assets'))
    .pipe(server.stream());
};

const info = () => {
  return src('views/parts/site-info/*').pipe(dest('./dist/assets'));
};

const watchFiles = () => {
  watch('views/**/*.pug', html);
  watch('views/**/*.js', js);
  watch('view/**/*.{png,jpg,webp}', images);
  watch('views/**/*.css', series(css, html));
};

exports.build = series(clean, css, images, js, info, html);
exports.default = series(clean, css, images, html, js, info, serve, watchFiles);
