var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var ControlledInput = require('./ControlledInput.jsx');
var VocabularyControlledInput = require('./VocabularyControlledInput.jsx');
var ControlledListStore = require('../stores/ControlledListStore.js');
var VocabularyStore = require('../stores/VocabularyStore.js');

var Form = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    values: React.PropTypes.instanceOf(Immutable.Map)
  },
  
  getDefaultProps: function() {
    return {
      recordType: '',
      values: Immutable.Map()
    };
  },
  
  getInitialState: function() {
    var controlledListNames = {};
    var vocabularyNames = {};
    
    this.collectControlledListNames(this.props.children, controlledListNames);
    this.collectVocabularyNames(this.props.children, vocabularyNames);

    var controlledLists = this.updateControlledLists(Immutable.Map(), Object.keys(controlledListNames));
    var vocabularies = this.updateVocabularies(Immutable.Map(), Object.keys(vocabularyNames));

    return {
      controlledLists: controlledLists,
      vocabularies: vocabularies
    }
  },
  
  componentDidMount: function() {
    ControlledListStore.addChangeListener(this.handleControlledListStoreChange);
    VocabularyStore.addChangeListener(this.handleVocabularyStoreChange);
  },
  
  updateControlledLists: function(controlledLists, names) {
    names.forEach(function(name) {
      controlledLists = controlledLists.set(name, ControlledListStore.get(name));
    });
    
    return controlledLists;
  },
  
  updateVocabularies: function(vocabularies, names) {
    names.forEach(function(name) {
      vocabularies = vocabularies.set(name, VocabularyStore.get(name));
    });
    
    return vocabularies;
  },
  
  collectControlledListNames: function(children, names) {
    React.Children.forEach(children, function(child) {
      if (child.type === ControlledInput.type) {
        var name = child.props.controlledListName;

        if (name) {
          names[name] = true;
        }
      }
      
      this.collectControlledListNames(child.props.children, names);
    }, this);
  },
  
  handleControlledListStoreChange: function() {
    
  },
  
  handleVocabularyStoreChange: function(name, data) {
    var vocabularies = this.state.vocabularies.set(name, data);

    this.setState({
      vocabularies: vocabularies
    });
  },
  
  labelControlledList: function(name, options) {
    if (!options) {
      return options;
    }
    
    return options.map(function(option) {
      if (!option.has('label')) {
        option = option.set('label', this.getIntlMessage('controlledList.' + name + '.' + option.get('value')));
      }
      
      return option;
    }, this);
  },
  
  collectVocabularyNames: function(children, names) {
    React.Children.forEach(children, function(child) {
      if (child.type === VocabularyControlledInput.type) {
        var name = child.props.vocabularyName;

        if (name) {
          names[name] = true;
        }
      }
      
      this.collectVocabularyNames(child.props.children, names);
    }, this);
  },
  
  getFieldLabel: function(fieldName) {
    var key = 'form.' + this.props.recordType + '.field.' + fieldName;
    
    try {
      return this.getIntlMessage(key);
    }
    catch(error) {
      //console.warn("Missing message for key " + key);
      return '';
    }
  },
  
  getPanelHeader: function(panelName) {
    var key = 'form.' + this.props.recordType + '.panel.' + panelName;
    
    try {
      return this.getIntlMessage(key);
    }
    catch(error) {
      //console.warn("Missing message for key " + key);
      return '';
    }
  },
  
  /*
   * Set labels and values.
   */
  decorateChildren: function(children, values) {
    var count = React.Children.count(children);
    
    if (count == 0) {
      return children;
    }
    
    if (count == 1) {
      return this.decorateNode(React.Children.only(children), values);
    }
    
    var decoratedChildren = React.Children.map(children, function(child) {
      return this.decorateNode(child, values);
    }, this);
    
    return decoratedChildren;
  },
  
  decorateNode: function(node, values) {
    var overrideProps = {};
    
    if (node.type.isInput) {
      var name = node.props.name;
      var label = node.props.label;
      var value = node.props.value;
      
      if (name) {
        if (typeof(label) === 'undefined') {
          label = this.getFieldLabel(name);
        }

        if (typeof(value) === 'undefined' && values) {
          value = values.get(name);
        }
      }
      else if (node.type.isCompoundInput) {
        // If a compound input doesn't have a name, pass the current value down.
        value = values;
      }
      
      overrideProps = {
        label: label,
        value: value,
        children: this.decorateChildren(node.props.children, (values ? values[name] : values))
      };

      if (node.type === ControlledInput.type) {
        if (typeof(node.props.options) === 'undefined') {
          var controlledListName = node.props.controlledListName;
      
          if (controlledListName) {
            overrideProps.options = this.labelControlledList(controlledListName, this.state.controlledLists.get(controlledListName));
          }
        }
      }
      else if (node.type === VocabularyControlledInput.type) {
        if (typeof(node.props.vocabulary) === 'undefined') {
          var vocabularyName = node.props.vocabularyName;
        
          if (vocabularyName) {
            overrideProps.vocabulary = this.state.vocabularies.get(vocabularyName);
          }
        }
      }
    }
    else if (node.type.isPanel) {
      var name = node.props.name;
      var header = node.props.header;
      
      if (name && typeof(header) === 'undefined') {
        header = this.getPanelHeader(name);
      }
      
      overrideProps = {
        header: header,
        children: this.decorateChildren(node.props.children, values)
      };
    }
    else {
      overrideProps = {
        children: this.decorateChildren(node.props.children, values)
      };
    }

    return React.addons.cloneWithProps(node, overrideProps);
  },
    
  render: function() {
    var classes = React.addons.classSet({
      form: true,
      recordType: this.props.recordType
    });
    
    return (
      <form className={classes}>
        {this.decorateChildren(this.props.children, this.props.values)}
      </form>
    );
  }
});

module.exports = Form;