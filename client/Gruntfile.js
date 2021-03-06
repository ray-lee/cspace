var webpack = require('webpack');

var BUILD_DIR = './build';
var DIST_DIR = './dist';
var DEFAULTS_DIR = './src/defaults';
var TENANTS_DIR = './src/tenants';
var DEPLOY_DIR = process.env.CSPACE_JEESERVER_HOME + '/cspace/ui';
var INDEX_FILE = 'index.html';
var TENANT_CONFIG_FILE = 'config/TenantConfig.js';
var WEBPACK_ENTRY_FILE = 'main.jsx';
var WEBPACK_OUTPUT_FILE = 'bundle.js';

module.exports = function(grunt) {
  var isProd = grunt.option('prod');
  var tenantSpec = grunt.option('tenant');
  var tenants = tenantSpec ? tenantSpec.split(',') : grunt.file.expand({ cwd: TENANTS_DIR }, '*');

  grunt.initConfig({
    'delete': {
      build: tenants.map(function(tenant) {
        return (BUILD_DIR + '/' + tenant);
      }),
      dist: tenants.map(function(tenant) {
        return (DIST_DIR + '/' + tenant);
      }),
      deploy: tenants.map(function(tenant) {
        return (DEPLOY_DIR + '/' + tenant);
      })
    },
    
    copy: {
      expandDefaults: {
        files: tenants.map(function(tenant) {
          return {
            expand: true,
            cwd: DEFAULTS_DIR,
            src: '**',
            dest: BUILD_DIR + '/' + tenant
          };
        })
      },
      mergeTenantOverlays: {
        files: tenants.map(function(tenant) {
          return {
            expand: true,
            cwd: TENANTS_DIR,
            src: tenant + '/**',
            dest: BUILD_DIR
          };
        })
      },
      deploy: {
        files: tenants.map(function(tenant) {
          return {
            expand: true,
            cwd: DIST_DIR,
            src: tenant + '/**',
            dest: DEPLOY_DIR
          };
        })
      }
    },
    
    webpack: {
      packTenants: {
        entry: tenants.reduce(function(map, tenant) {
          map[tenant] = BUILD_DIR + '/' + tenant + '/' + WEBPACK_ENTRY_FILE;
          return map;
        }, {}),
        output: {
          path: DIST_DIR,
          filename: '[name]/' + WEBPACK_OUTPUT_FILE,
          pathinfo: isProd ? false : true
        },
        module: {
          loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'jsx-loader?harmony'
          }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader'
          }]
        },
        resolve: {
          extensions: ['', '.jsx', '.js']
        },
        debug: isProd ? false : true,
        devtool: isProd ? null : 'source-map',
        plugins: isProd ? [
          new webpack.optimize.UglifyJsPlugin(),
          new webpack.optimize.OccurenceOrderPlugin()
        ] : null
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.task.renameTask('clean', 'delete');
  
  grunt.registerTask('verifyTenantDirs', 'Verify that tenant directories exist.', function() {
    var allTenantDirsExist = true;
    
    tenants.forEach(function(tenant) {
      var tenantDir = TENANTS_DIR + '/' + tenant;
      
      if (!grunt.file.isDir(tenantDir)) {
        grunt.log.error('Tenant directory not found: ' + tenantDir);
        allTenantDirsExist = false;
      }
    });
    
    return allTenantDirsExist;
  });
  
  grunt.registerTask('verifyEnv', 'Verify that required environment variables are set.', function(target) {
    if (target === 'deploy') {
      if (process.env.CSPACE_JEESERVER_HOME) {
        return true;
      }
      else {
        grunt.log.error('Required environment variable CSPACE_JEESERVER_HOME is not set.');
        return false;
      }
    }
  });
  
  grunt.registerTask('generateTenantConfigs', 'Generate tenant configuration files.', function() {
    tenants.forEach(function(tenant) {
      var configFile = BUILD_DIR + '/' + tenant + '/' + TENANT_CONFIG_FILE;
      var config = grunt.file.read(configFile);

      config = grunt.template.process(config, {
        data: {
          tenantId: tenant
        }
      });

      grunt.file.write(configFile, config);
    });
  });
  
  grunt.registerTask('generateIndexFiles', 'Generate tenant index files.', function() {
    tenants.forEach(function(tenant) {
      var file = BUILD_DIR + '/' + tenant + '/' + INDEX_FILE;
      var content = grunt.file.read(file);

      content = grunt.template.process(content, {
        data: {
          tenantId: tenant
        }
      });

      grunt.file.write(DIST_DIR + '/' + tenant + '/' + INDEX_FILE, content);
    });
  });
  
  grunt.registerTask('clean', ['delete:build', 'delete:dist']);
  grunt.registerTask('build', ['verifyTenantDirs', 'clean', 'copy:expandDefaults', 'copy:mergeTenantOverlays', 'generateTenantConfigs', 'webpack:packTenants', 'generateIndexFiles']);
  grunt.registerTask('undeploy', ['verifyEnv:deploy', 'delete:deploy']);
  grunt.registerTask('deploy', ['verifyEnv:deploy', 'copy:deploy']);
  
  grunt.registerTask('default', ['build', 'deploy']);
};
