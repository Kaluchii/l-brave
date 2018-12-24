var
    gulp         = require('gulp'),

    autoprefixer = require('gulp-autoprefixer'),
    less         = require('gulp-less'),
    cssmin       = require('gulp-cssmin'),
    csscomb      = require('gulp-csscomb'),
    uglify       = require('gulp-uglify'),
    postcss      = require('gulp-postcss'),
    reporter     = require('postcss-reporter'),
    htmllint     = require('gulp-htmllint'),
    stylelint    = require('stylelint'),

    svgmin       = require('gulp-svgmin'),
    imagemin     = require('gulp-imagemin'),
    browserSync  = require('browser-sync'),

    changeCase   = require('change-case'),
    concat       = require('gulp-concat'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    gutil        = require('gulp-util'),
    sourcemaps   = require('gulp-sourcemaps'),
    args         = require('yargs'),

    jasmine     = require('gulp-jasmine');

//======================================================================================================================
// -- Переменные для настройки
//======================================================================================================================
// пути до файлов
var devCss         = './dev/less/',
    devImg         = './dev/img/',
    devJs          = './dev/js/',
    productionCss  = './css/',
    productionImg  = './img/',
    html           = '../resources/views/front/';
// Параметры для галпа
var arguments    = args.argv;
var isProduction = arguments.production !== undefined;
// Расширения изображений
var image_ext = '{png,Png,PNG,jpg,Jpg,JPG,jpeg,Jpeg,JPEG,gif,Gif,GIF,bmp,BMP,Bmp}';
//======================================================================================================================



//======================================================================================================================
//-- js Test --
//======================================================================================================================
gulp.task('js:test', function(){
    gulp.src('./dev/test.js')
        .pipe(jasmine());
// TODO: реализовать передачу параметра для тестов - имени файла. Если не передан то выполнить ВСЕ тесты
});
//======================================================================================================================


//======================================================================================================================
//Компиляция и обработка LESS
//======================================================================================================================
gulp.task('style', function () {
    gulp.src(devCss + '*.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer('last 20 version', 'safari 5', 'ie 8', 'ie9', 'opera 12.1', 'chrome', 'ff', 'ios'))
        .pipe(csscomb('./dev/config/.csscomb.json'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(productionCss))
        .pipe(browserSync.reload({
            stream: true
        }))
});
//======================================================================================================================

gulp.task('vendor-js', function() {
    gulp.src([
        devJs + 'plugins/*.js',
        devJs + 'plugins/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src([
        devJs + '*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('php', function() {
    browserSync.reload();
    browserSync.reload({ // Что бы после перезагрузки страницы стили тоже подтягивались
        stream: true     // если не работает, то удалить
    });
});

//======================================================================================================================
//Валидация LESS и HTML
//======================================================================================================================
// Линтер лесс файлов
gulp.task('lint:less', function () {

    var processors = [
        stylelint({
            config        : styleLintConfig,
            failAfterError: false
        }),
        reporter({
            clearMessages: true,
            throwError   : false
        })
    ];

    return gulp.src(devCss + '**/*.less')
        .pipe(plumber())
        .pipe(postcss(processors, {syntax: syntax_less}));
});
// Линтер HTML файлов
gulp.task('lint:html', function () {
    return gulp.src(html + '**/*.blade.php')
        .pipe(htmllint({
            config: './dev/config/.htmllintrc'
        }, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath +
                ' [' + issue.line + ',' + issue.column + ']: ')
                + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}
//======================================================================================================================

//======================================================================================================================
//Оптимизация изображений
//======================================================================================================================
gulp.task('image', function () {
    // Оптимизация всех файлов кроме векторных
    gulp.src(devImg + '**.' + image_ext)
        .pipe(plumber())
        .pipe(imagemin({
            progressive      : false,
            interlaced       : true,
            optimizationLevel: 7
        }))
        .pipe(rename(function (path) {
            path.basename = changeCase.lowerCase(path.basename); // Запись файлов в нижнем регистре вместе с расширением
            path.extname  = changeCase.lowerCase(path.extname);  // Запись файлов в нижнем регистре вместе с расширением
        }))
        .pipe(gulp.dest(productionImg))
        .pipe(browserSync.reload({
            stream: true
        }));
    // Оптимизация векторных файлов ( пока только SVG )
    gulp.src(devImg + '*.svg')
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(rename(function (path) {
            path.basename = changeCase.lowerCase(path.basename);
            path.extname  = changeCase.lowerCase(path.extname);
        }))
        .pipe(gulp.dest(productionImg))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//======================================================================================================================


//======================================================================================================================
//Ватчеры файлов
//======================================================================================================================
// Следят за всеми less файлами
// Так же следит за новыми файлами изображений - копирует их в рабочую директорию, оптимизирует и переводит в нижний регистр
// TODO: для картинок сделать CHANGED копирование и оптимизация только изменных файлов
gulp.task('watch', function () {
    browserSync.init({
        browser: ["google-chrome"/*, "firefox"*/],
        proxy: 'http://l-brave/',
        notify: false,
        reloadDelay: 100,
        serveStatic: ['../css']
    });

    gulp.watch('*.*',{cwd: devImg}, ['image']);
    gulp.watch('*.less',{cwd: devCss}, ['style']);
    gulp.watch('**/*.less',{cwd: devCss}, ['style']);
    gulp.watch( '*.js',{cwd: devJs}, ['js']);
    gulp.watch('plugins/*.js',{cwd: devJs}, ['vendor-js']);
    gulp.watch('plugins/**/*.js',{cwd: devJs}, ['vendor-js']);
    gulp.watch('**/*.php',{cwd: html}, ['php']);
    gulp.watch('*.php',{cwd: html}, ['php']);
});
//======================================================================================================================


gulp.task('production', function () {
    gulp.src(devCss + '*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer('last 20 version', 'safari 5', 'ie 8', 'ie9', 'opera 12.1', 'chrome', 'ff', 'ios'))
        .pipe(csscomb('./dev/config/.csscomb.json'))
        .pipe(cssmin())
        .pipe(gulp.dest(productionCss));


    gulp.src([
        devJs + 'plugins/*.js',
        devJs + 'plugins/**/*.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({
            stream: true
        }));


    gulp.src([
        devJs + '*.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});









// Всевозможные конфиги для линтеров и оптимизаторов
// TODO: Реализовать хранение конфигураций в отдельных файлах


var styleLintConfig = {
    "rules": {
        "at-rule-empty-line-before"                         : ["always", {
            except: [
                "blockless-after-same-name-blockless",
                "first-nested",
            ],
            ignore: ["after-comment"],
        }],
        "at-rule-name-case"                                 : "lower",
        "at-rule-name-space-after"                          : "always-single-line",
        "at-rule-semicolon-newline-after"                   : "always",
        "block-closing-brace-empty-line-before"             : "never",
        "block-closing-brace-newline-after"                 : "always",
        "block-closing-brace-newline-before"                : "always-multi-line",
        "block-closing-brace-space-before"                  : "always-single-line",
        "block-no-empty"                                    : true,
        "block-opening-brace-newline-after"                 : "always-multi-line",
        "block-opening-brace-space-after"                   : "always-single-line",
        "block-opening-brace-space-before"                  : "always",
        "color-hex-case"                                    : "lower",
        "color-hex-length"                                  : "long",
        "color-no-invalid-hex"                              : true,
        "comment-empty-line-before"                         : ["always", {
            except: ["first-nested"],
            ignore: ["stylelint-commands"],
        }],
        "comment-no-empty"                                  : true,
        "comment-whitespace-inside"                         : "always",
        "custom-property-empty-line-before"                 : ["always", {
            except: [
                "after-custom-property",
                "first-nested",
            ],
            ignore: [
                "after-comment",
                "inside-single-line-block",
            ],
        }],
        "declaration-bang-space-after"                      : "never",
        "declaration-bang-space-before"                     : "always",
        "declaration-block-no-duplicate-properties"         : [true, {
            ignore: ["consecutive-duplicates-with-different-values"],
        }],
        "declaration-block-no-redundant-longhand-properties": true,
        "declaration-block-no-shorthand-property-overrides" : true,
        "declaration-block-semicolon-newline-after"         : "always-multi-line",
        "declaration-block-semicolon-space-after"           : "always-single-line",
        "declaration-block-semicolon-space-before"          : "never",
        "declaration-block-single-line-max-declarations"    : 1,
        "declaration-block-trailing-semicolon"              : "always",
        "declaration-colon-newline-after"                   : "always-multi-line",
        "declaration-colon-space-after"                     : "always-single-line",
        "declaration-colon-space-before"                    : "never",
        "declaration-empty-line-before"                     : ["always", {
            except: [
                "after-declaration",
                "first-nested",
            ],
            ignore: [
                "after-comment",
                "inside-single-line-block",
            ],
        }],
        "font-family-no-duplicate-names"                    : true,
        "function-calc-no-unspaced-operator"                : true,
        "function-comma-newline-after"                      : "always-multi-line",
        "function-comma-space-after"                        : "always-single-line",
        "function-comma-space-before"                       : "never",
        "function-linear-gradient-no-nonstandard-direction" : true,
        "function-max-empty-lines"                          : 0,
        "function-name-case"                                : "lower",
        "function-parentheses-newline-inside"               : "always-multi-line",
        "function-parentheses-space-inside"                 : "never-single-line",
        "function-whitespace-after"                         : "always",
        "indentation"                                       : 2,
        "keyframe-declaration-no-important"                 : true,
        "length-zero-no-unit"                               : true,
        "max-empty-lines"                                   : 1,
        "media-feature-colon-space-after"                   : "always",
        "media-feature-colon-space-before"                  : "never",
        "media-feature-name-case"                           : "lower",
        "media-feature-name-no-unknown"                     : true,
        "media-feature-parentheses-space-inside"            : "never",
        "media-feature-range-operator-space-after"          : "always",
        "media-feature-range-operator-space-before"         : "always",
        "media-query-list-comma-newline-after"              : "always-multi-line",
        "media-query-list-comma-space-after"                : "always-single-line",
        "media-query-list-comma-space-before"               : "never",
        "no-empty-source"                                   : true,
        "no-eol-whitespace"                                 : true,
        "no-extra-semicolons"                               : true,
        "no-invalid-double-slash-comments"                  : true,
        "no-missing-end-of-source-newline"                  : true,
        "number-leading-zero"                               : "always",
        "number-no-trailing-zeros"                          : true,
        "property-case"                                     : "lower",
        "property-no-unknown"                               : true,
        "rule-non-nested-empty-line-before"                 : ["always-multi-line", {
            ignore: ["after-comment"],
        }],
        "selector-attribute-brackets-space-inside"          : "never",
        "selector-attribute-operator-space-after"           : "never",
        "selector-attribute-operator-space-before"          : "never",
        "selector-combinator-space-after"                   : "always",
        "selector-combinator-space-before"                  : "always",
        "selector-descendant-combinator-no-non-space"       : true,
        "selector-list-comma-newline-after"                 : "always",
        "selector-list-comma-space-before"                  : "never",
        "selector-max-empty-lines"                          : 0,
        "selector-pseudo-class-case"                        : "lower",
        "selector-pseudo-class-no-unknown"                  : true,
        "selector-pseudo-class-parentheses-space-inside"    : "never",
        "selector-pseudo-element-case"                      : "lower",
        "selector-pseudo-element-colon-notation"            : "double",
        "selector-pseudo-element-no-unknown"                : true,
        "selector-type-case"                                : "lower",
        "selector-type-no-unknown"                          : true,
        "shorthand-property-no-redundant-values"            : true,
        "string-no-newline"                                 : true,
        "unit-case"                                         : "lower",
        "unit-no-unknown"                                   : true,
        "value-list-comma-newline-after"                    : "always-multi-line",
        "value-list-comma-space-after"                      : "always-single-line",
        "value-list-comma-space-before"                     : "never",
        "value-list-max-empty-lines"                        : 0,
    },
};
