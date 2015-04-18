var React = require('react');
var Router = require('react-router');

var App = require('./components/App.jsx');
var Public = require('./components/Public.jsx');
var Authenticated = require('./components/Authenticated.jsx');
var Home = require('./components/Home.jsx');
var Login = require('./components/Login.jsx');
var Logout = require('./components/Logout.jsx');
var RecordEditor = require('./components/RecordEditor.jsx');

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var routes = (
  <Route path="/cspace/core" handler={App}>
    <Route handler={Public}> 
      <Route name="login" path="login" handler={Login} />
      <Route name="logout" path="logout" handler={Logout} />
    </Route>
  
    <Route handler={Authenticated}>
      <DefaultRoute name="home" handler={Home} />
      <Route name="newrecord" path="record/:recordType" handler={RecordEditor} />
      <Route name="record" path="record/:recordType/:csid" handler={RecordEditor} />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
