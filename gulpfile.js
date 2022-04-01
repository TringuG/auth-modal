const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlToJs = require("gulp-html-to-variable");
const del = require("del");

function buildHtml() {
  const task = src("src/**/*.html")
    .pipe(htmlToJs({ concat: "templates.js", global: "html" }))
    .pipe(dest("./dist/"));

  return task;
}

function buildJs() {
  const task = src([
    "src/adapters/*.js",
    "src/modals/*/*.js",
    "src/utils/*.js",
    "src/auth-modal.js",
  ])
    .pipe(concat("sources.js"))
    .pipe(dest("./dist/"));

  return task;
}

function mergeBuilds() {
  const task = src(["dist/templates.js", "dist/sources.js"])
    .pipe(concat("auth-modal.js"))
    .pipe(dest("./dist/"));

  return task;
}

function cleanup() {
  const task = del(["dist/templates.js", "dist/sources.js"]);

  return task;
}

const tasks = series(buildHtml, buildJs, mergeBuilds, cleanup);

exports.default = tasks;

exports.watch = function() {
  watch('src/**/*.*', tasks);
};