/*global module:false*/
module.exports = function(grunt) {
  var _ = require("underscore");
  var localTasks = _.initial(["jshint", "uglify", "csslint", "cssmin", "imagemin"])
	//load all the grunt tasks
	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),

      connect: {
      	options: {
      		port: 8080,
      		hostaname: "localhost",	//default is "*", can be IP or dns
      		livereload: 35729	//define the port for watching
      	},

      	server : {
      		options: {
      			open: true,	//auto open browser
      			base: [
      				"dist"	//home directory
      			]
      		}
      	}
      },

      jshint: {
        build: ["src/js/*.js"],
        options: {
          jshintrc: ".jshintrc"
        }
      },

      uglify: {
        options: {
          banner: "/*! auther: <%= pkg.author %>\n" + 
          "<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n"
        },
        build: {
          files: [{
            expand: true,
            cwd: "src/js",
            src: "**/*.js",
            dest: "dist/js",
            ext: ".min.js"
          }]
        }
      },

      csslint: {
        build: ["src/css/*.css"],
        options: {
          csslintrc: ".csslintrc"
        }
      },

      cssmin: {
        build: {
          files: [{
            expand: true,
            cwd: "src/css",
            src: "*.css",
            dest: "dist/css",
            ext: ".min.css"
          }]
        }
      },

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: "src/images/",
            src: "**/*.{png,jpg,gif}",
            dest: "dist/images/"
          }]
        }
      },

      copy: {
        main: {
          files: [
            {
              expand: true,       
              cwd: "bower_components/",
              src: ["**/*min.*"],
              dest: "dist/lib/"
            }
          ]
        }
      },

      watch: {
      	livereload: {
      		options: {
      			livereload: "<%=connect.options.livereload%>",
            spawn: false
      		},

      		files: [//the following files is changing, the page will refresh
      			"dist/**",
            "src/**",
            "Gruntfile.js",
            ".csslintrc",
            ".jshintrc"
      		],
          tasks: _.union(localTasks,["copy"])
      	}
      }
    });

    // These plugins provide necessary tasks.
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', _.union(localTasks, ["copy", "connect", "watch"]));

};
