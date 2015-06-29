/**
 * @jsx React.DOM
 */

// React dependencies
var React  = require('react/addons');
var Router = require('react-router-component');

// Pull React animation component and Router components
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Location           = Router.Location;
var Link               = Router.Link;

// Animated location routes
var AnimatedLocations = React.createClass({

    mixins: [Router.RouterMixin, Router.AsyncRouteRenderingMixin],

    getRoutes: function() {
      return this.props.children;
    },

    render: function() {

      var handler = this.renderRouteHandler();
      var isPopState = this.state.navigation.isPopState;
      var enabled = isPopState ?
                    !!this.props.popStateTransitionName :
                    !this.state.navigation.noTransition;
      var props = {
        component: React.DOM.div,
        transitionEnter: enabled,
        transitionLeave: enabled,
      };
      if (isPopState && this.props.popStateTransitionName) {
        props.transitionName = this.props.popStateTransitionName;
      } else if (this.state.navigation.transitionName) {
        props.transitionName = this.state.navigation.transitionName;
      }

      handler.props.key = this.state.match.path;
      return this.transferPropsTo(CSSTransitionGroup(props, handler));

    }
});

// Set Parent component with AnimatedLocation Routes
var App = React.createClass({
  render: function() {
    return (
      <AnimatedLocations hash className="Main" transitionName="moveUp" popStateTransitionName="fade">
        <Location path="/" handler={HomePage} />
        <Location path="/about" handler={AboutPage} />
      </AnimatedLocations>
    )
  }
})

// Home Page
var HomePage = React.createClass({
  render: function() {
    return (
      <div className="MainPage Page">
        <div className="Page__wrapper">
          <h1>Emre Surmeli</h1>
          <p>
            <Link href="/about">About</Link>
          </p>
        </div>
      </div>
    )
  }
})

// About Page
var AboutPage = React.createClass({
  render: function() {
    return (
      <div className="AboutPage">
        <div className="Page__wrapper">
          <h1>About Emre</h1>
          <Link transitionName="moveDown" href="/">Home</Link>
        </div>
      </div>
    )
  }
})

React.renderComponent(App(), document.body);
