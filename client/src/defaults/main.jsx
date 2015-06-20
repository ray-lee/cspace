var React = require('react');
var Router = require('react-router');
var TenantConfig = require('./config/TenantConfig');
var App = require('./components/App');
var Public = require('./components/Public');
var Authenticated = require('./components/Authenticated');
var Home = require('./components/Home');
var Login = require('./components/Login');
var Logout = require('./components/Logout');
var RecordEditor = require('./components/RecordEditor');
var Blank = require('./components/Blank');

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var routes = (
  <Route path={'/cspace/' + TenantConfig.id} handler={App}>
    <Route handler={Public}>
      <Route name="login" path="login" handler={Login} />
      <Route name="logout" path="logout" handler={Logout} />
    </Route>
  
    <Route handler={Authenticated}>
      <DefaultRoute name="home" handler={Home} />
  
      <Route name="mycspace" path="mycspace" handler={Blank} />
      <Route name="create" path="create" handler={Blank} />
      <Route name="search" path="search" handler={Blank} />
      <Route name="admin" path="admin" handler={Blank} />

      <Route name="newrecord" path="record/:recordType" handler={RecordEditor} />
      <Route name="record" path="record/:recordType/:csid" handler={RecordEditor} />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
