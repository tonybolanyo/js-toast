var browserSync = require("browser-sync").create();
var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require("gulp-rename");
var size = require("gulp-size");
var sourcemaps = require("gulp-sourcemaps");
var template = require("gulp-template");

// define dist route
var distFolder = "./dist";

// for html
var htmlmin = require("gulp-htmlmin");

// for css
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var postcss = require("gulp-postcss");
var postscss = require("postcss-scss");
var purifycss = require("gulp-purifycss");
var sass = require("gulp-sass");
var stylelint = require('stylelint');

// for JavaScript
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var tap = require("gulp-tap");
var uglify = require("gulp-uglify");

console.log("Output folder:", distFolder);

gulp.task("default", ["html", "build"], function() {
    browserSync.init({
        server: {
            baseDir: distFolder
        }
    });

    // watch html files to reload browser
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

    // watch styles folder to compile sass files
    gulp.watch(["src/styles/*.scss", "src/styles/**/*.scss"], ["sass"]);

    // watch javascript folder to compile script files
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});

gulp.task("build", ["sass", "js"]);

// compile html files
gulp.task("html", function () {
    gulp.src("src/*.html")
        // minimize html files
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        // copy to dist folder
        .pipe(gulp.dest(distFolder))
        /// and reload browsers
        .pipe(browserSync.stream());
});

// compile css styles from sass files
gulp.task("sass", ["sass:lint"], function () {
    var plugins = [
        // add prefixes to old browsers compatibility
        autoprefixer(),
        // compress compiled css
        cssnano()
    ];
    gulp.src("src/styles/*.scss")
        // capture sourcemaps
        .pipe(sourcemaps.init())
        // compile sass
        .pipe(sass().on("error", sass.logError))
        .pipe(size({
            showFiles: true
        }))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        //.pipe(purifycss(["src/js/*.js", "src/js/**/*.js", "src/*.html", "src/components/*.html", "src/layouts/*.html", "src/includes/*.html"]))
        .pipe(postcss(plugins, { syntax: postscss }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        // save sourcemaps in css folder
        .pipe(sourcemaps.write("./"))
        // copy to dist folder
        .pipe(gulp.dest(distFolder + "/css/"))
        // and reload browsers
        .pipe(browserSync.stream());
});

// lint scss styles
gulp.task("sass:lint", function () {
    gulp.src(["src/styles/*.scss", "src/styles/**/*.scss", "!src/styles/components/_icons.scss"])
        .pipe(postcss([
            // lint style files
            stylelint()
        ]))
});

// Generate config file
gulp.task('config', function() {
    return gulp.src('src/js/config.tmpl.js')
        .pipe(template({
            config: JSON.stringify({
                ApiBaseUrl: process.env.BUTACA57_API_BASE_URL || 'http://localhost:8000/api/1.0'
            })
        }))
        .pipe(rename('config.js'))
        .pipe(gulp.dest('src/js/'));
  });

// compile and generate only one js file
gulp.task("js", ["config"], function () {
    gulp.src("src/js/main.js")
        // tap allows to apply a function to every file
        .pipe(tap(function (file) {
            // replace content file with browserify result
            file.contents = browserify(file.path, {
                    debug: true
                }) // new browserify instance
                .transform("babelify", {
                    presets: ["env"]
                }) // ES6 -> ES5
                .bundle() // compile
                .on("error", gutil.log) // treat errors
        }))
        // back file to gulp buffer to apply next pipe
        .pipe(buffer())
        .on("finish", () => gutil.log('Original size:'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // minimize and ofuscate JavaScript file
        .pipe(uglify())
        .on("finish", () => gutil.log('Size after uglify:'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        // write sourcemap o same directory
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distFolder + "/js/"))
        // and reload browsers
        .pipe(browserSync.stream())
});