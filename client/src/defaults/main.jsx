var React = require('react');
var Router = require('react-router');

var App = require('./components/App/App.jsx');
var Home = require('./components/Home/Home.jsx');
var RecordEditor = require('./components/RecordEditor/RecordEditor.jsx');

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var routes = (  
  <Route name="app" path="/cspace/core" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="record" path="record/:recordType" handler={RecordEditor} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
