var React = require('react/addons');
var Immutable = require('immutable');
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');
var TermCompletionStore = require('../stores/TermCompletionStore.js');

require('../styles/AuthorityControlledInput.css');

var AuthorityControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    bindings: React.PropTypes.array, //.isRequired
  },
  
  getInitialState: function() {
    return {
      query: null,
      terms: null
    }
  },
  
  componentDidMount: function() {
    TermCompletionStore.addChangeListener(this.handleTermCompletionStoreChange);
  },
  
  componentWillUnmount: function() {
    TermCompletionStore.removeChangeListener(this.handleTermCompletionStoreChange);
  },
  
  handleTermCompletionStoreChange: function(query, data) {
    if (query === this.state.query) {
      this.setState({
        terms: data
      });
    }
  },
  
  handleInputChange: function(value) {
    var binding = this.props.bindings[0];
    
    // TODO: Handle multiple bindings.
    
    var authority = binding[0];
    var vocabulary = binding[1];
    var queryString = value;

    var query = {
      authority: authority,
      vocabulary: vocabulary,
      queryString: queryString
    };
    
    var data = TermCompletionStore.search(query);
    
    this.setState({
      query: query,
      terms: data
    });
  },
  
  render: function() {
    var jewel = (
      <div className="autocompletejewel"></div>
    );
    
    var value = this.props.value;
    var options = null;
    
    if (this.state.terms) {
      options = getOptions(this.state.terms);
    }
    else if (value) {
      // Create a placeholder option list, containing just the value.

      options = Immutable.List([Immutable.Map({
        value: value,
        label: getDisplayName(value)
      })]);
    }
    
    return (
      <ControlledInput {...(this.props)} value={this.props.value} options={options} jewel={jewel}
          onChange={this.handleInputChange}/>
    );
  }
});

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
}

var getOptions = function(terms) {
  var options = Immutable.List();

  if (terms) {
    options = terms.map(function(term) {
      return Immutable.Map({
        value: term.get('baseUrn'),
        // FIXME: Handle non-preferred display names
        label: term.get('displayNames').first()
      });
    });
  }
  
  console.log(options.toString());
  return options;
};

module.exports = AuthorityControlledInput;