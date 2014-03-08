'use strict';

var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '0.0.0.0',
          keepalive: true,
          base: './'
        }
      }
    },
    // karma: {
    //   options: {
    //     configFile: 'karma.conf.js'
    //   },
    //   dev: {
    //     // starts the Karma server with autowatch enabled
    //   }
    // },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: 'js/templates/'
        },
        files: {
          'js/templates/templates.js': 'js/templates/**/*.hbs'
        }
      }
    },
    watch: {
      emberTemplates: {
        files: 'js/templates/**/*.hbs',
        tasks: ['emberTemplates:compile']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        // careful with this, this could be messy specify dirs.
        files: './**/*.{js,html,hbs,css}'
      }
    },
    concurrent: {
      dev: {
        tasks: [
        'connect:server',
        // 'karma:dev',
        'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });


  grunt.registerTask('default', 'Starts the webserver up, watches for Handlebars template changes, and starts the test server', [
    'emberTemplates:compile',
    'concurrent:dev'
  ]);

}