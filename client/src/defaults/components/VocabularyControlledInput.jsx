var React = require('react/addons');
var Immutable = require('immutable');
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/ControlledInput.css');

var VocabularyControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  hasTerms: function() {
    return (this.props.vocabulary && this.props.vocabulary.getIn(['fields', 'terms']));
  },
  
  render: function() {
    var value = (this.hasTerms() ? this.props.value : getDisplayName(this.props.value));
    
    return (
      <ControlledInput {...(this.props)} value={value} options={getOptions(this.props)}/>
    );
  }
});

var getShortIdentifier = function(refName) {
  var id = refName;
  
  if (refName && refName.match(/:item:name\((.*?)\)/)) {
    id = RegExp.$1;
  }
  
  return id;
};

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
};

var getRefName = function(vocabularyShortID, term) {
  // FIXME: The app layer doesn't provide enough information to build the full ref name.
  // Hardcoding part of it here.
  
  return (
    'urn:cspace:core.collectionspace.org:vocabularies:name(' + vocabularyShortID + 
      '):item:name(' + term.get('shortIdentifier') + ")'" + term.get('displayName') + "'"
  );
}

var getOptions = function(props) {
  var options = Immutable.List();

  if (props.vocabulary) {
    var vocabularyShortID = props.vocabulary.getIn(['fields', 'shortIdentifier']);
    var terms = props.vocabulary.getIn(['fields', 'terms']);

    if (terms) {
      options = terms.map(function(term) {
        return Immutable.Map({
          value: getRefName(vocabularyShortID, term),
          label: term.get('displayName')
        });
      });
    }
  }  
  
  // if (props.value) {
  //   options = options.push(Immutable.Map({
  //     value: getShortIdentifier(props.value),
  //     label: getDisplayName(props.value)
  //   }));
  // }
  
  return options;
};

module.exports = VocabularyControlledInput;