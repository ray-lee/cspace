var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;

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
    var clone;
    
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
      
      clone = React.addons.cloneWithProps(node, {
        label: label,
        value: value,
        children: this.decorateChildren(node.props.children, (values ? values[name] : values))
      });
    }
    else if (node.type.isPanel) {
      var name = node.props.name;
      var header = node.props.header;
      
      if (name && typeof(header) === 'undefined') {
        header = this.getPanelHeader(name);
      }
      
      clone = React.addons.cloneWithProps(node, {
        header: header,
        children: this.decorateChildren(node.props.children, values)
      });
    }
    else {
      clone = React.addons.cloneWithProps(node, {
        children: this.decorateChildren(node.props.children, values)
      });
    }

    return clone;
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