# gulp-jade-template-concat
Compiles Jade templates single file containing template functions.  For projects small enough that they don't require AMD or CommonJS loaders.

## Install
```sh
$ npm install --save-dev gulp-jade-template-concat
```

## Usage
### Gulpfile
```javascript
var jade = require('gulp-jade');
var jadeConcat = require('gulp-jade-template-concat');

gulp.task("client-templates", function(){
    gulp.src('src/jade/templates/**/*.jade')
        .pipe(jade({
            client: true
        })
        .pipe(jadeConcat('mytemplates.js', {templateVariable:"templates"}))
        .pipe(gulp.dest('build/templates/'))
});
```

This compiles all of your client side jade templates into a file called `mytemplates.js`.  The `templateVariable` option is optional and will default to `templates` if it is not set.


### HTML/Jade
Link the concatenated file with a script tag
```jade
script(src="templates/mytemplates.js")
```

### Javascript
Access the generated templates using dot or bracket access notation.
```javascript
  templates['template1'];
  templates.template2;
```