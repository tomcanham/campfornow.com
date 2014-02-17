module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // CONFIG ===================================/
    watch: {
      sass: {
        files: ['**/*.{scss,sass}'],
        tasks: ['sass:build']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['uglify:buildCustom']
      }
    },

    sass: {
      build: {
        options: {
          loadPath: ['bower_components/bootstrap-sass/vendor/assets/stylesheets'],
          style: 'expanded'
        },
        files: {
          './public/css/style.css': './styles/style.scss'
        } 
      }
    },

    uglify: {
      buildCustom: {
        files: {
          'public/js/main.min.js': [
            'js/main.js'
          ]
        }
      },
    }

  });

  // DEPENDENT PLUGINS =========================/

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // TASKS =====================================/

  grunt.registerTask('default', ['sass:build' , 'uglify:buildCustom' , 'watch']);

};