/*
 * @Description: 
 * @Author: handongliang dongliang.han@12301.cn
 * @Date: 2023-02-09 11:14:41
 * @LastEditors: handongliang dongliang.han@12301.cn
 * @LastEditTime: 2023-02-14 14:34:58
 */
const path = require('path');
const cwd = process.cwd();
const merge2 = require('merge2');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const gulp = require('gulp');
const rimraf = require('rimraf');
const webpack = require('webpack');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true,
    ...compilerOptions,
}

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function dist(done) {
    rimraf.sync(getProjectPath('dist'));
    process.env.RUN_ENV = 'PRODUCTION';
    console.log('[Parallel] dist to umd...');
    const webpackConfig = require(getProjectPath('webpack.config.js'));
    webpack(webpackConfig, (err, stats) => {
        if (stats.hasErrors()) {
            if (bail) {
                process.exit(1);
            }
        }
        done(0);
    })
}

function babelify(js, modules) {
    const babelConfig = getBabelCommonConfig(modules);
    delete babelConfig.cacheDirectory;
    const stream = js.pipe(babel(babelConfig));
    return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
    rimraf.sync(modules !== false ? libDir : esDir);
    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'typings/**/*.d.ts',
        '!components/**/__tests__/**',
        '!components/**/demo/**',
    ];
    let sourceStream = gulp.src(source);
    if (modules === false) {
        // sourceStream = sourceStream.pipe({
        //     stripCode({
        //         start_comment: '@remove-on-es-build-begin',
        //         end_comment: '@remove-on-es-build-end',
        //     })
        // })
    }
    const tsResult = sourceStream.pipe(ts(tsConfig));
    const tsFilesStream = babelify(tsResult.js, modules);
    const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
    return merge2([tsFilesStream, tsd].filter(s => s));
}

gulp.task('compile-with-es', done => {
    console.log('[Parallel] Compile to es...');
    compile(false).on('finish', done)
});

gulp.task('compile-with-lib', done => {
    console.log('[Parallel] Compile to js...');
    compile().on('finish', done)
});


gulp.task(
    'compile',
    gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'))
)

gulp.task('dist', gulp.series(done => {
    dist(done);
}));