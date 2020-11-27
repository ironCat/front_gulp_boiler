## Light Gulp boilerplate Front-end development for simple projects.

**Quick start**

1. Clone this repo
2. To install dependencies
    $ npm install or $ yarn install
3. Run gulp scripts by default for watching, preprocessing SCSS, browsersync
    $ gulp
3. Fun
4. To optimize images and project build to _dist folder_, run
    $ gulp build

**Includes:**
- "gulp": "^ 4.0.2",
- "gulp-sass": "^ 4.1.0",
- "gulp-autoprefixer": "^7.0.1",
- "gulp-concat": "^ 2.6.1",
- "gulp-uglify-es": "^ 2.0.0",
- "gulp-imagemin": "^7.1.0",
- "browser-sync": "^ 2.26.13",
- "jquery": "^ 3.5.1"

**Options:**

- **gulp default** => run in parallel watching scss styles, scripts, browsersync
- **gulp build** => run build in _dest_ folder