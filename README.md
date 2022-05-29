# Welcome to the Gulp Starter Kit.

# Table of Contents

---

1. [Requirements](#installation-requirements)
2. [Build Tools & Assets](#build-tools-&-assets)
3. [Getting Started](#getting-started)
4. [Build Commands](#build-commands)

# Installation requirements

---

* Node.js (at least version 10)
* NPM
* Gulp.js version 4

# Tools & Frontend Assets

---

## What's included:
* Gulp 4 - [Documentation](https://gulpjs.com/docs/en/getting-started/quick-start)
* Sass Compiling (using gulp-sass) - [Documentation](https://github.com/dlmanning/gulp-sass)
* PostCSS (using gulp-postcss) - [Documentation](https://github.com/postcss/gulp-postcss)
* Babel.js - [Documentation](https://babeljs.io/docs/en/)
* ESlint (using gulp-eslint) - [Documentation](https://github.com/adametry/gulp-eslint#readme)
* Webpack 4 (for javascript dependencies) - [Documentation](https://v4.webpack.js.org/concepts/)
* BrowserSync - [Documentation](https://www.browsersync.io/docs)
* Minification of CSS and JS for production use (using [cssnano](https://github.com/cssnano/cssnano) and Webpack's built in optimization of ['production' mode](https://v4.webpack.js.org/configuration/mode/))
* Favicon Generation (using gulp-real-favicon) - [Documentation](https://github.com/RealFaviconGenerator/gulp-real-favicon)

## Frontend assets:
* Vanill Lazyload - [Documentation](https://github.com/verlok/vanilla-lazyload/tree/17.1.3)
* jQuery v3.4 - [Documentation](https://api.jquery.com/)

# Getting Started

---

## Customizing output path
Change `"paths": { "distFolder": "dist/" }` in `package.json` to be where you want to output the frontend files. If you leave everything as is, it will create this folder structure **inside** the `distFolder`: 
```
/dist
  |
  |- /images
  |- /fonts
  |- /css
  |- /js
```
If more control over the folder structure is needed inside `gulpfile.js` you can edit:
```javascript
dist_css = path.join(dist_folder, '/css'),
dist_js = path.join(dist_folder, '/js'),
dist_img = path.join(dist_folder, '/images'),
dist_font = path.join(dist_folder, '/fonts'),
dist_html = path.join(dist_folder, '/**/*.{twig,html}'),
```

## Injecting links to CSS and Javascript
First, make sure `dist_html` variable inside `gulpfile.js` points to the production path to your html files.

Then place these html comments inside the `./src` html files:

For CSS:
```
<!-- inject:css -->
<!-- endinject -->
```

For Javascript:
```
<!-- inject:js -->
<!-- endinject -->
```
 

## Favicons
Icons and `.webmanifest` are generated using `gulp-real-favicon`. Overwrite `src/favicon260x260.png` or change the variable `const favicon = path.join(src_folder, 'favicon260x260.png')` to point to the master image for generating the favicons. Master favicon image should be at least 260x260.

Change these variables in `package.json` to match your site's design:
```json
{
	"favicon": {
		"themeColor": "#ffffff",
    	"backgroundColor": "#da532c"
	}
}
```
`themeColor` is used to create `<meta name="theme-color" content="#ffffff">` and the color information in the `.webmanifest` file.

`backgroundColor` will be used for the background of `ms-tile` icons.

# Build Commands

---

## `gulp serve`
Probably the go-to command for development.

This does the following:
* Compiles sass (and runs any postcss plugins)
* Lints javascript
* Builds webpack
* Optimizes images
* Copies fonts
* Injects the link to CSS and javascript sources
* Copies all frontend files to the `distFolder`. 

Also, it spins up a static server using browsersync. Frontend of the site can be accessed at http:localhost:3000.

Then it watches for any changes at:
```
gulpfile.js variables:
src_asset_html
src_asset_scss
src_asset_js
src_asset_img
src_asset_font
```

and then it will re-run commands depending on what changed in order to compile sass, build webpack, or copy over file changes.

## `npm run serve:dist`
This is the production version of `gulp serve`. It creates the production version of CSS and Javascript files by:
* Minifies CSS (cssnano) and JS (Webpack)
* Omits source maps for CSS and JS

## `npm run critical-css:dist`
Make sure `paths.criticalPages` in `package.json` contains an object of the pages you want to generate critical css for.
```json
{
	"paths": {
		"criticalPages": {
			// name for template 
			// (no spaces or special characters)    // direct URL 
			"name-of-template": 					"index.html"
		}
	}
}
```
After running the command, CSS that should be inlined can be found in`dist/css/critical/` folder.

## `npm run build:dev`
Builds out development version of frontend code.

## `npm run build`
Builds out production version of frontend code.

## `gulp generate-favicon`
This uses gulp-real-favicon to generate the favicons using a master favicon image (`src/favicon260x260.png` is the default one).

These are the files generated out of the box:
```bash
android-chrome-192x192.png
android-chrome-256x256.png
apple-touch-icon.png
browserconfig.xml
favicon-16x16.png
favicon-32x32.png
favicon.ico
html_code.html ## contains the html that should be added to the head of your site
mstile-144x144.png
mstile-150x150.png
mstile-310x150.png
mstile-310x310.png
mstile-70x70.png
site.webmanifest ## customization of manifest items can be done inside gulpfile.js
```