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
  
  getLabel: function(fieldName) {
    var key = 'form.' + this.props.recordType + '.field.' + fieldName;
    
    try {
      return this.getIntlMessage(key);
    }
    catch(error) {
      console.warn("Missing message for key " + key);
      return '';
    }
  },
  
  /*
   * Set labels and values.
   */
  decorateChildren: function(children) {
    var count = React.Children.count(children);
    
    if (count == 0) {
      return children;
    }
    
    if (count == 1) {
      return this.decorateNode(React.Children.only(children));
    }
    
    var decoratedChildren = React.Children.map(children, function(child) {
      return this.decorateNode(child);
    }, this);
    
    return decoratedChildren;
  },
  
  decorateNode: function(node) {
    var clone;

    if (node.type.isInput) {
      var name = node.props.name;
      var label = node.props.label;
      
      if (name && typeof(label) === 'undefined') {
        label = this.getLabel(name);
      }
      
      clone = React.addons.cloneWithProps(node, {
        label: label,
        children: this.decorateChildren(node.props.children)
      });
    }
    else {
      clone = React.addons.cloneWithProps(node, {
        children: this.decorateChildren(node.props.children)
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
        {this.decorateChildren(this.props.children)}
      </form>
    );
  }
});

module.exports = Form;