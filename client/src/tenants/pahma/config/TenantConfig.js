// tenantId is replaced with the appropriate value by grunt at build time.
// See Gruntfile.js.

var tenantId = '<%= tenantId %>';

module.exports = {
  id: tenantId,
  // A hack, since some app layer APIs do not provide enough
  // information to construct a refname.
  refNameNamespace: tenantId + '.cspace.berkeley.edu'
};