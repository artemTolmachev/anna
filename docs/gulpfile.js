
//первые шаги в консоле: npm install --global gulp-cli  (уст-ем галп глобально в десктопе!!!)
//устанавливаем packige.json : npm init (в папке проекта!!!) заполняем анкету и перемещаем папку в вс-код
//устанавливаем галп для проекта: npm install gulp --save-dev
//для поверки function defaultTask(cb) {cb();} exports.default = defaultTask и вызываем команду галп
//должно получитья примерно так: [] Using gulpFile... []starting 'default'... []finished 'default'after..
//если не получилось то чистим кэш  npm cache clean --force 
//и устанавливаем заново: npm i npm -g , установку галп глобально , установку галп в проект , повторяем проверку 
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');




let project_folder = "dist";//папка для заказчика 
let source_folder = "#src";//папка с исходными файлами

// let fs = require('fs');//файл систем для подключения шрифтов 

let path = {
    build:{ //пути куда галп будет выгружать обработанные файлы       
        html: project_folder+"/",
        css: project_folder+"/css/",
        js: project_folder+"/js/",
        img: project_folder+"/img/",
        fonts: project_folder+"/fonts/",
  

    },

    src:{ //путь к папки с которой галп берет файлы для обработки
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{png,jpg,gif,ico,svg,webp}",
        fonts: source_folder + "/fonts/*.{ttf,otf,eot,svg,woff}",
       
    },

    watch:{//путь по которому галп будет прослушивать файлы изменившиеся
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{png,jpg,gif,ico,svg,webp}",
    },

    clean: "./"+ project_folder +"/" //объект который удаляет папку dist каждый раз после запуска
}

let {src, dest} = require('gulp'),
gulp = require('gulp'),
browsersync = require("browser-sync").create(),//обновляет страницу(npm i browser-sync --save-dev)
fileinqlude = require('gulp-file-include'),
del = require("del"), //объявляем перменную для чистки папки dest(npm i del --save-dev )
scss = require("gulp-sass"),//объявляем перменную для scss (npm i gulp-sass --save-dev)
autoprefixer = require("gulp-autoprefixer"),//объявляем перменную (npm i gulp-autoprefixer --save-dev)
group_media = require("gulp-group-css-media-queries"),//объявляем перменную для медио файлов (npm i --save-dev gulp-group-css-media-queries)
clean_css = require("gulp-clean-css"),//объявляем перменную для сжатия css file (npm i --save-dev gulp-clean-css)
renameFile = require("gulp-rename"),//объявляем перменную для дублир-го, не сжатого css,js файла (npm i --save-dev gulp-rename)
uglify = require("gulp-uglify-es").default,//обяв-м переменную для сжатия js файла (npm i --save-dev gulp-uglify-es)
imagemin = require("gulp-imagemin"),//обяв-м переменную для оптимизации картинок (npm i --save-dev gulp-imagemin)
webp = require('gulp-webp'),//переменная для конвертации формата картинок в webp (npm i --save-dev gulp-webp)
webphtml = require('gulp-webp-html'),//переменная для сокращения кода в html для картинок в webp (npm i --save-dev gulp-webp-html)
webpcss = require('gulp-webpcss'),//переменная для интеграции webp в css ( npm i gulp-webpcss --save-dev)
svgSprites = require('gulp-svg-sprite');// переменная для функц спрайт (npm i --save-dev gulp-svg-sprite)

function browserSync(params) { //функция обновляет страницу
    browsersync.init({
        server:{
            baseDir: "./"+ project_folder +"/"
        },
        port: 3000,
        notify: false //выключаем всплывающую табличку обновления
    })
}

function html() { 
    return src(path.src.html)
    .pipe(fileinqlude())//для сборки в один файл (групировка)
    .pipe(webphtml())//сокращение кода до стандартной записи для <img> для webp изображений
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
    .pipe(fileinqlude()) 
    .pipe(dest(path.build.js))
    .pipe(
        uglify()//для сжатия js файла
    )
    .pipe(
        renameFile({
            extname: ".min.js"//дублированный сжатый файл (функция для переименования)
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css) //путь исходного файла из которого получаем scss file
    .pipe(
        scss({
            outputStile: "expanded" //функция для преобразования css в scss 
        })
    )
    .pipe(
        group_media()//для сбора всех медио файллов (функция групировка)
    )

    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"], //для последних 5 версий
            cascade: true
        })
    )

    .pipe(webpcss())   
    .pipe(dest(path.build.css))//путь в который выводится scss файл(первая выгрузка перед сжатием)
    .pipe(clean_css())//для сжатия файла css

    .pipe(
        renameFile({
            extname: ".min.css"//дублированный сжатый файл (функция для переименования)
        })
    )
    .pipe(dest(path.build.css))//путь в который выводится scss файл (вторая выгрузка после сжатия )
    .pipe(browsersync.stream())
}

function images() {
        return src(path.src.img)
        .pipe(
            webp({
                quality: 70 //качество изображения  
            })
        )
        .pipe(dest(path.build.img))//выгрузка после конвертации
        .pipe(src(path.src.img))//копирование для обработки
        .pipe(
            imagemin({       //сжатие
                progressive: true,
                svgoPlugins: [{removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 1 //0 to 7  сила сжатия 
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
    }

    function fonts () { 
        gulp.src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
    }
   

gulp.task('svgSprites', function() { //фунция для соединения иконок svg в срайты
    return gulp.src([source_folder + '/iconsprite/*.svg']) //копируем иконки с исходников
        .pipe(svgSprites({
            mode: {
                stack: {
                    sprite: "../icons/icon.svg", //sprite file name 
                    example: true // создает файл с примерами иконок
                }
            },
        }
        ))
        .pipe(dest(path.build.img)) //выгрузка изображений
})


function watchFiles(params) { // устанавливаем слежку за измененями файлов
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean); //путь к папки dest, функция чистит папку dest
}

let build = gulp.series(clean, gulp.parallel( js, css, html, images, fonts));// папка чистится и создается заново
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts; 
exports.images = images;  
exports.js = js;    
exports.html = html;
exports.css = css;    
exports.build = build;
exports.watch = watch;
exports.default = watch;