"use strict";

module.exports = (grunt) => {
  const sass = require("node-sass");

  require("time-grunt")(grunt);
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
  });

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          "css/style.css": "css/style.scss",
        },
      },
    },
    watch: {
      files: "css/*.scss",
      tasks: ["sass"],
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/*.js"],
        },
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./",
        },
      },
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            src: ["*.html"],
            dest: "dist",
          },
        ],
      },
      js: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./js",
            src: ["*.js"],
            dest: "dist/js",
          },
        ],
      },
    },
    clean: {
      build: {
        scr: ["dist/"],
      },
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            src: ["img/*.{png,jpg,gif}"],
            dest: "dist/",
          },
        ],
      },
    },
    useminPrepare: {
      foo: {
        dest: "dist",
        src: ["index.html", "aboutus.html", "contactus.html"],
      },
      options: {
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
          post: {
            css: [
              {
                name: "cssmin",
                createConfig: (context, bloxk) => {
                  const generated = context.options.generated;
                  generated.options = {
                    keepSpecialComments: 0,
                    rebase: false,
                  };
                },
              },
            ],
          },
        },
      },
    },
    concat: {
      options: {
        separator: ";",
      },
      dist: {},
    },
    uglify: {
      dist: {},
    },
    cssmin: {
      dist: {},
    },
    filerev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 20,
      },
      releases: {
        files: [
          {
            src: ["dist/js/*.js", "dist/css/*.css"],
          },
        ],
      },
    },
    usemin: {
      html: ["dist/index.html", "dist/aboutus.html", "dist/contactus.html"],
      options: {
        assetsDirs: ["dist", "dist/css", "dist/js"],
      },
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
        },
        files: {
          "dist/index.html": "dist/index.html",
          "dist/aboutus.html": "dist/aboutus.html",
          "dist/contactus.html": "dist/contactus.html",
        },
      },
    },
  });

  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin",
  ]);
};
