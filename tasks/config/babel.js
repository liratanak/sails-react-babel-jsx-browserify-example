/**
 * Babel
 * source in assets/babel
 */ 
module.exports = function (grunt) {
	grunt.config.set('babel', {
		options: {
			sourceMap: true,
			presets: ['es2015']
		},
		files: {
			expand: true,
			cwd: 'assets/babel',
			src: ['**/*.js'],
			dest: 'assets/js/'
		}
	});

	grunt.loadNpmTasks('grunt-babel');
};