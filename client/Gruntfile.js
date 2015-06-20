var tenants = [
  'core', 'lifesci'
];

module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      expandDefaults: {
        files: tenants.map(function(tenant) {
          return {
            expand: true,
            cwd: 'src/defaults',
            src: '**',
            dest: 'build/' + tenant
          };
        })
      },
      mergeTenants: {
        files: tenants.map(function(tenant) {
          return {
            expand: true,
            cwd: 'src/tenants/' + tenant,
            src: '**',
            dest: 'build/' + tenant
          }
        })
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('default', ['copy']);
};