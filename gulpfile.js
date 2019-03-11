'use strict';

var gulp = require('gulp'),
  gzip = require('gulp-gzip'),
  autoprefixer = require('autoprefixer'),
  cssmin = require('gulp-csso'),
  deploy = require('gulp-gh-pages'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  postcss = require("gulp-postcss"),
  plumber = require("gulp-plumber"),
  pngquant = require('imagemin-pngquant'),
  rigger = require('gulp-rigger'),
  runSequence = require('run-sequence'),
  rimraf = require('rimraf'),
  htmlMin = require("gulp-htmlmin"),
  rename = require("gulp-rename"),
  typography = require('gulp-typograf'),
  // reload = browserSync.reload,
  sass = require('gulp-sass'),
  strip = require('gulp-strip-comments'),
  server = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  svgStore = require('gulp-svgstore'),
  stylelint = require('gulp-stylelint'),
  uglify = require('gulp-uglify-es').default,
  watch = require('gulp-watch'),
  webp = require("gulp-webp"),
  qualityOfImage = 65;

var path = {
  src: { // original files
    favicons: 'source/favicons/**/*.*',
    html: 'source/*.html',
    js: 'source/js/**/*.js',
    style: 'source/sass/style.scss',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },

  build: { // paths for compilated files
    favicons: 'build/favicons/',
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },

  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    favicons: 'source/favicons/**/*.*',
    html: 'source/**/*.html',
    js: 'source/js/**/*.js',
    react: 'source/react/**/*.js',
    style: 'source/sass/**/*.scss',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },

  clean: './build'
};

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 3000,
  logPrefix: "NooNoo"
};

// HTML
// compilate templates
// minify html
gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(typography({locale: ['ru', 'en-US']}))
    // .pipe(gzip({}))
    .pipe(gulp.dest(path.build.html))
    // .pipe(reload({stream: true}));
    .pipe(server.stream());
});

// TYPOGRAF
// typograf all texts
gulp.task('typography', function () {
  return gulp.src(path.build.html)
    .pipe(typography({locale: ['ru', 'en-US']}))
    .pipe(gulp.dest(path.build.html));
});

// JS
// make sourcemap
// compilate scripts
// minify js
gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    // .pipe(gzip({}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(server.stream());
});

// STYLE
// make sourcemap
// compilate sass
// set autoprefixes
gulp.task('style', function () {
  return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssmin())
    // .pipe(gzip({}))
    .pipe(sourcemaps.write())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(path.build.css))
    .pipe(server.stream());
  // .pipe(reload({stream: true}));
});

// IMAGES
// первоначальный вариант
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,JPEG,svg}")
    .pipe(imagemin([
      // imagemin.optipng({optimizationLevel: 3}),
      // imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(path.build.img));
});

// IMAGES
// compress PNG, JPG, SVG
gulp.task('img', function () {
  gulp.src("source/img/**/*.{png,jpg,JPEG,svg}")
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5,

      svgoPlugins: [{
        removeViewBox: false,
        removeUselessStrokeAndFill: true,
      }],

      use: [pngquant()],
      interlaced: true,
      verbose: true
    }))
    .pipe(gulp.dest(path.build.img))
  // .pipe(reload({stream: true}));
});

// WEBP
// make webp pictures
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{jpg,png,JPEG,jpeg}")
    .pipe(webp({quality: qualityOfImage}))
    .pipe(gulp.dest("build/img"));
});

// SVG
// make svg sprite
gulp.task("sprite", function () {
  return gulp.src("build/img/svgs/*.svg")
    .pipe(svgStore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"))
  // .pipe(reload({stream: true}));
});

// FONTS
gulp.task('fonts', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

// CLEAN
gulp.task('clean', function () {
  return del("build");
});


// COPY
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    'source/css/**',
    'source/favicons/**/*',
    'source/download-files/**/*',
  ], {
    base: "source"
  })

    .pipe(gulp.dest("build"));
});


// COMMENTS
// delete all comments in build version of project
gulp.task('stripComments', function () {
  return gulp.src('build/*.html')
    .pipe(strip.html())
    .pipe(gulp.dest('build'));
});

// WEBSERVER
// run webserver
gulp.task('webserver', function () {
  browserSync(config);
});

// BUILD
// all gulp tasks
gulp.task("build", function (done) {
  runSequence(
    'clean',
    'copy',
    'html',
    // 'typography',
    'stripComments',
    'style',
    'js',
    'fonts',
    'images',
    'img',
    'webp',
    'sprite',
    done
  );
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  // WATCH
  // watch tasks
  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/**/*.html", ["html"], ["typography"]);
  gulp.watch("source/js/**/*.js", ["js"]);
  gulp.watch("source/react/**/*.js", ["react"]);
  gulp.watch("source/img/**/*.{png,jpg,JPEG}", ["img", "webp"]);
  gulp.watch("source/img/**/*.svg", ["sprite"]);
});

gulp.task('deploy', function () {
  return gulp.src("build/**/*")
    .pipe(deploy())
});

// Запуск тасков по умолчанию
// gulp.task('default', ['build', 'webserver', 'watch']);
