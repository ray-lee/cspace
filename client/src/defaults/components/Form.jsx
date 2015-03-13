var React = require('react');

var Form = React.createClass({
  propTypes: {
    recordType: React.PropTypes.string.isRequired
  },
  
  getDefaultProps: function() {
    return {
      recordType: null
    };
  },
  
  render: function() {
    var classes = React.addons.classSet({
      form: true,
      recordType: this.props.recordType
    });
    
    return (
      <form className={classes}>
        {this.props.children}
      </form>
    );
  }
});

module.exports = Form;