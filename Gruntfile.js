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
					"dist/css/style.css": "src/scss/style.scss"
				}
			}
		},

		babel: {
			options: {
				sourceMap: true,
				modules: "common"
			},
			dist: {
				files: {
					"dist/js/app.js": "src/js/app.js"
				}
			}
		},

		webpack: {
			dist: {
				entry: "./dist/js/app.js",
				output: {
					path: "./dist/js/",
					filename: "bundle.js"
				}
			}
		},

		copy: {
			dist: {
				files: {
					"dist/index.html": "src/index.html"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-babel");
	grunt.registerTask("css", ["sass"]);

	grunt.registerTask("default", ["clean", "sass", "babel", "copy", "webpack"]);

};
