/* gulpfile.js */

const uswds = require("@uswds/compile");

/**
 * USWDS version
 * Set the version of USWDS you're using (2 or 3)
 */

uswds.settings.version = 3;

/**
 * Path settings
 * Set as many as you need
 */

let mainPath = './_uswds';
let resourcesPath = `./assets/uswds`;

uswds.paths.dist.img = `${resourcesPath}/img`;
uswds.paths.dist.fonts = `${resourcesPath}/fonts`;
uswds.paths.dist.js = `${resourcesPath}/js`;
uswds.paths.dist.css = `_sass`;
uswds.paths.dist.sass = `${mainPath}/sass`;
uswds.paths.dist.theme = `${mainPath}`;

/**
 * Exports
 * Add as many as you need
 */

 exports.compile = uswds.compile;
 exports.watch = uswds.watch;
 exports.update = uswds.updateUswds;