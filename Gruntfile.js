module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		clean: ["build"],

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					"build/css/style.css": "src/scss/style.scss"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-sass");

	grunt.registerTask("default", ["clean", "sass"]);
	grunt.registerTask("css", ["sass"]);

};
