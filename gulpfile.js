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
  return src('views/**/*.include.css')
    .pipe(cleanCSS())
    .pipe(
      rename(({ basename, extname }) => {
        const index = basename.indexOf('.');
        const name = basename.substring(0, index);
        return {
          dirname: 'dist/assets',
          basename: name.charAt(0).toUpperCase() + name.slice(1),
          extname,
        };
      })
    )
    .pipe(dest('./'))
    .pipe(server.stream());
};

const inlineCSS = () => {
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

const watchFiles = () => {
  watch('views/**/*.pug', html);
  watch('views/**/*.include.css', css);
  watch('views/**/*.js', js);
  watch('view/**/*.{png,jpg,webp}', images);
  watch(['views/**/*.css', '!views/**/*.include.css'], series(inlineCSS, html));
};

exports.css = series(inlineCSS);
exports.build = series(clean, inlineCSS, css, images, js, html);
exports.default = series(
  clean,
  inlineCSS,
  css,
  images,
  html,
  js,
  serve,
  watchFiles
);
