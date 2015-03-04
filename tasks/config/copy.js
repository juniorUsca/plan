/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}, {
				expand: true,
				cwd: './bower_components',
				src: [
          'angular/angular.js',
          'angular-animate/angular-animate.js',
          'angular-cookies/angular-cookies.js',
          'angular-mocks/angular-mocks.js',
          'angular-resource/angular-resource.js',
          'angular-route/angular-route.js',
          'angular-sanitize/angular-sanitize.js',
          'angular-scenario/angular-scenario.js', 
          'angular-touch/angular-touch.js', 
          'lodash/dist/lodash.js', 
          'restangular/dist/restangular.js', 
          'jquery/dist/jquery.js',
          'es5-shim/es5-shim.js',
          'json3/lib/json3.js'
        ],
				flatten: true,
				dest: '.tmp/public/js/dependencies'
			}, /*{ 
        expand: true,
        cwd: './bower_components',
        src: [
          'materialize/dist/css/materialize.css'
        ],
        flatten: true,
        dest: '.tmp/public/styles/dependencies'
			}, { 
        expand: true,
        cwd: './assets',
        src: [
        	//'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
        ],
        flatten: true,
        dest: '.tmp/public/styles/font'
			}, { 
        expand: true,
        cwd: './bower_components',
        src: [
          'materialize/dist/font/material-design-icons/Material-Design-Icons.ttf',
          'materialize/dist/font/material-design-icons/Material-Design-Icons.woff'
        ],
        flatten: true,
        dest: '.tmp/public/styles/font/material-design-icons'
      }*/]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
