module.exports = {
  getDisplayName: function(refName) {
    var displayName = refName;

    if (refName && refName.match(/'(.*)'$/)) {
      displayName = RegExp.$1;
    }
  
    return displayName;
  }
};