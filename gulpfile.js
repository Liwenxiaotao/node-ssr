const gulp = require('gulp')
// 打包工具
const rollup = require('gulp-rollup')
// 打包时替换字符串
const replace = require('rollup-plugin-replace')
const watch = require('gulp-watch')
const babel = require('gulp-babel')
// 开发环境
function builddev() {
  // 监听文件变化
  return watch('src/nodeuii/**/*.js', function() {
    gulp.src('src/nodeuii/**/*.js')
      .pipe(babel({
        babelrc: false,
        "plugins": [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose" : true }],
          "transform-es2015-modules-commonjs"
        ]
      }))
      .pipe(gulp.dest('dist'))
  })
}

function buildprod() {
  return gulp.src('src/nodeuii/**/*.js')
    .pipe(babel({
      babelrc: false,
      ignore: ['./src/nodeuii/config/index.js'],
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        "transform-es2015-modules-commonjs"
      ]
    }))
    .pipe(gulp.dest('dist'))
}

// 打包配置文件
function bulidconfig() {
  return gulp.src('src/nodeuii/**/*.js')
    .pipe(rollup({
      output: {
        format: 'cjs'
      },
      input: "./src/nodeuii/config/index.js",
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify('production')
        })
      ]
    }))
    .pipe(gulp.dest('./dist'))
}

let build;
if(process.env.NODE_ENV === 'production') {
  build = gulp.series(buildprod, bulidconfig);
}

if(process.env.NODE_ENV === 'development') {
  build = gulp.series(builddev);
}

if(process.env.NODE_ENV === 'lint') {
  build = gulp.series(bulidconfig);
}

gulp.task('default', build)