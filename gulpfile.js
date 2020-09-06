var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();


gulp.task('sass',function(){

    return gulp.src("./Sass/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());

});

gulp.task('serve',gulp.series('sass',function(){
    browserSync.init({
        server:"./"
    });

    gulp.watch("./Sass/main.scss",gulp.series('sass'));
    gulp.watch("./index.html").on("change",browserSync.reload);
    gulp.watch("./app/app.js").on("change",browserSync.reload);

}));

gulp.task('default',gulp.series('serve'));