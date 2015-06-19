var webpack = require('webpack');

var TENANT_FILE_PATTERN = /\/src\/tenants\/(.*?)\//;
var TENANT_PATH = '/src/tenants/';
var DEFAULT_PATH = '/src/defaults/';

/**
 * A resolver plugin that looks for a file first in the tenant
 * directory, then in the defaults directory.
 */
function FileResolverPlugin() {
  this.tenant = null;
}

FileResolverPlugin.prototype.apply = function(resolver) {
  resolver.plugin(['file'], function(request, callback) {
    if (request.skipDefaultFileResolverPlugin) {
      return callback();
    }
    
    var file = this.join(request.path, request.request);

    if (file.match(TENANT_FILE_PATTERN)) {
      this.tenant = RegExp.$1;
    
      var innerRequest = {
        request: file,
        query: request.query,
        file: true,
        skipDefaultFileResolverPlugin: true
      };

      this.doResolve('file', innerRequest, function(err, result) {
        if (!err) {
          return callback(err, result);
        }

        var defaultFile = file.replace(TENANT_FILE_PATTERN, DEFAULT_PATH);
        console.log("DEFAULT: " + defaultFile);

        var defaultRequest = {
          request: defaultFile,
          query: request.query,
          file: true,
          skipDefaultFileResolverPlugin: true
        };
      
        this.doResolve('file', defaultRequest, callback);
      }.bind(this));
    }
    else if (file.indexOf(DEFAULT_PATH) !== -1 && this.tenant) {
      var tenantFile = file.replace(DEFAULT_PATH, TENANT_PATH + this.tenant + '/');
      console.log("TENANT: " + tenantFile);
      
      var tenantRequest = {
        request: tenantFile,
        query: request.query,
        file: true
      };
      
      this.doResolve('file', tenantRequest, callback);
    }
    else {
      return callback();
    }
  });
};

module.exports = {
  entry: {
    core: './src/tenants/core/main.jsx',
    lifesci: './src/tenants/lifesci/main.jsx'
  },
  output: {
    path: 'dist',
    filename: '[name]/bundle.js'
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
  plugins: [
      new webpack.ResolverPlugin([new FileResolverPlugin()])
  ]
};