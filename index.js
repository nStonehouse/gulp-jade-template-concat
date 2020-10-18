var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through');


function pluginError (message) {
  return new PluginError('gulp-jade-template-concat', message)
}


module.exports = function jadeConcat(fileName, _opts) {
  if (!fileName) throw pluginError('Missing fileName')

  var defaults = {templateVariable: "templates"}
  var concatString = "";


  function write (file) {
    if (file.isNull()) return
    if (file.isStream()) return this.emit('error', pluginError('Streaming not supported'))

    //isolate filename from full path
    var filename = file.path.replace(file.base, "").replace("/", "").replace(".js", "");

    // replace template name with filename
    var contents = file.contents.toString();

    concatString += '(function(){' + contents + '\n' + _opts.templateVariable + '["' + filename + '"]=template;})();';
  }

  function end () {
    //wrap concatenated string in template object
    var templateString = "var " + _opts.templateVariable + " = {};" + concatString;

    this.queue(new gutil.File({
      path: fileName,
      contents: new Buffer(templateString)
    }))

    this.queue(null)
  }

  return through(write, end)
}
