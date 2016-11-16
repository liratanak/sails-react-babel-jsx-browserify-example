/**
 * Browserify
 */
module.exports = function (grunt) {
	grunt.config.set('browserify', {
		client: {
			src: ['assets/js/index.js'],
			dest: 'assets/js/bundle.js'
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
};