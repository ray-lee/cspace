// A CollectionSpace singleton.

var TenantConfig = require('../config/TenantConfig');
var CollectionSpace = require('collectionspace');

module.exports = new CollectionSpace({
  tenant: TenantConfig.id
});