"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const del = require("del");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const usemin = require("gulp-usemin");
const rev = require("gulp-rev");
const htmlmin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");
const flatmap = require("gulp-flatmap");

gulp.task("sass", () => {
  return gulp
    .src("./css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", () => {
  gulp.watch("./css/*.scss", ["sass"]);
});

gulp.task("browser-sync", () => {
  const files = [
    "./*.html",
    "./css/*.css",
    "./js/*.js",
    "./img/*.{png,jpg,gif}",
  ];
  browserSync.init(files, {
    server: {
      baseDir: "./",
    },
  });
});

gulp.task("default", gulp.series("browser-sync"), () => {
  gulp.start("sass:watch");
});

gulp.task("clean", () => {
  return del(["dist"]);
});

gulp.task("copyScripts", () => {
  return gulp.src("./js/*.js").pipe(gulp.dest("./dist/js"));
});

gulp.task("imagemin", () => {
  return gulp
    .src("./img/*.{png,jpg,gif}")
    .pipe(imagemin({ optimizationLevel: 3, progressive: true }))
    .pipe(gulp.dest("./dist/img"));
});

gulp.task("usemin", () => {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap((stream) =>
        stream.pipe(
          usemin({
            css: [rev()],
            html: [() => htmlmin({ collapseWhitespace: true })],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), "concat"],
          })
        )
      )
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "build",
  gulp.series("clean", "copyScripts", "imagemin", "usemin"),
  () => {
    console.log("completed");
  }
);
