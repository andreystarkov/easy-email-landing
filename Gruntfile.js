module.exports = function(grunt) {

  var optipng = require('imagemin-optipng');
  var jpegtran = require('imagemin-jpegtran');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> | im@andreystarkov.ru */\n',
        mangle: true
      },
      build: {
        files: {
          'dist/js/all.js': [
            'src/js/libs/_jquery-1.11.2.min.js',
            'src/js/skel/skel.min.js',
            'src/js/libs/fontsmoothie.min.js',
            'src/js/libs/tooltipster.min.js',
            'src/js/libs/transit.min.js',
            'src/js/libs/wow.min.js',
            'src/js/main.js',
          ],
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> | im@andreystarkov.ru */'
        },
        files: {
          'dist/css/all.css': [
            'src/css/animate.css',
            'src/css/normalize.css',
            'src/css/tooltipster.css'
          ],
          'dist/css/style.css': 'src/css/style.css',
          'dist/css/style-medium.css': 'src/css/style-medium.css',
          'dist/css/style-mobile.css': 'src/css/style-mobile.css',
          'dist/css/style-desktop.css': 'src/css/style-desktop.css'
        }
      }
    },
    imagemin: {
       dynamic: {
         options: {
          use: [optipng({ optimizationLevel: 3 }), jpegtran({ progressive: true })]
         },
         files: [{
           expand: true,
           cwd: 'src/img/',
           src: ['**/*.{png,jpg,gif}'],
           dest: 'dist/img'
         }]
        }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyJS: true,
          preserveLineBreaks: true,
          conservativeCollapse: true
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin', 'htmlmin']);

};