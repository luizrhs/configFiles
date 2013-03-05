'use strict';
var addPrefix=function(prefix, arg){if(String==typeof arg){return prefix+arg;}else{for(var i=0;i<arg.length;i++){arg[i]=prefix+arg[i];}return arg;}}

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');


	// ADD YOUR FILES HERE
	// IN THE ORDER YOU WANT THEM TO BE CONCATENATED 
	/*================================
	=            JS FILES            =
	================================*/
	var jsFiles = addPrefix("app/js/", [

		'main.js',
		'module.js'

	]);
	/*-----  End of JS FILES  ------*/
	
	

	grunt.initConfig({

		jsFiles: jsFiles,

		/*==========  LESS  ==========*/
		less: {
			development: {
				files: {
					"app/styles/dist/main.css": "app/styles/main.less"
				}
			}
		},

		/*==========  WATCH  ==========*/
		watch: {

			dev: {
				files: [
					'app/styles/**/*.less',
					'<%= jsFiles %>',
					'<%= jshint.files %>',
				],
				tasks: ['less', 'concat', 'jshint']
			},

			test: {
				files: [
					'<%= jsFiles %>',
					'<%= jshint.files %>',
					'tests/**/*-spec.js',
				],
				tasks: ['concat', 'jshint', 'jasmine']
			}
		},

		/*==========  CONCAT  ==========*/
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['<%= jsFiles %>', '!app/js/vendor/*', '!app/js/dist/*'],
				dest: 'app/js/dist/main.js'
			}
		},

		/*==========  JSHINT  ==========*/
		jshint: {
			files: [
				'app/js/**/*.js',
				'!app/js/vendor/*', 
				'!app/js/dist/*'
			]
		},

		/*==========  CONNECT  ==========*/
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'app',
					keepalive: true
				}
			}
		},

		jasmine: {
			default: {
				src: 'app/js/dist/main.js',
				options: {
					specs: 'tests/**/*-spec.js',
					vendor: [
						'app/js/vendor/jquery.js',
						'app/js/vendor/angular.min.js',
						'tests/lib/angular-mocks.js'
					]
				}
			}
		}

	});

	grunt.registerTask('begin', [
		'less',
		'concat',
		'jshint',
		'watch:dev'
	]);

	grunt.registerTask('test-unit', [
		'concat',
		'jshint',
		'jasmine',
		'watch:test'
	]);
};