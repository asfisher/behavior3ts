'use strict';
const gulp = require("gulp");
const concat = require("gulp-concat");
const minify = require('gulp-minify');
const fs = require('fs');
const path = require("path");

function readDir(basePath, extension) {
    let outs = [];
    let files = fs.readdirSync(basePath);
    files.forEach((fileName) => {
        var fullname = path.join(basePath, fileName);
        var stats = fs.statSync(fullname);
        if (stats.isDirectory()) {
            let childOuts = readDir(fullname, extension);
            outs = outs.concat(childOuts);
        } else if (extension && fullname.lastIndexOf(extension) != -1) {
            outs.push(fullname);
        }
    })
    return outs;
}

const ts = require('gulp-typescript');
const footer = require("gulp-footer");
const gulpIf = require("gulp-if");
const header = require("gulp-header");
const replace = require("gulp-replace");
const sourcemaps = require('gulp-sourcemaps');

let pkg = JSON.parse(fs.readFileSync("./package.json").toString());
var version = pkg.version;
var vTime = Date.now();
let allModule = [];

buildModel("core", true, true);
gulp.task('default', gulp.series(...allModule));
function buildModel(modelName) {
    let modelProject = ts.createProject(`tsconfig/tsconfig_${modelName}.json`);
    gulp.task(modelName, () => {
        let tscVinyl = modelProject.src()
            .pipe(sourcemaps.init())
            .pipe(modelProject())
        tscVinyl.dts
            .pipe(header(`//版本号${version},编译时间${(new Date()).toString()}\r\n`))
            .pipe(gulp.dest("./"))
        return tscVinyl.js
            .pipe(sourcemaps.write('./'))
            .pipe(minify({ ext: { min: ".min.js" } }))
            .pipe(gulp.dest("./"))
    })

    // gulp.task(modelName + "Ts", () => {
    //     return modelProject.src()
    //         .pipe(modelProject()).dts
    //         .pipe(header(`//版本号${version},编译时间${(new Date()).toString()}\r\n`))
    //         .pipe(gulp.dest("./"));
    // });
    allModule.push(modelName);
}