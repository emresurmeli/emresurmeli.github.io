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

      var handler    = this.renderRouteHandler();
      var isPopState = this.state.navigation.isPopState;
      var enabled    = isPopState ?
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
          <h2>Web Developer | Coffee Lover | TA @ <a href="https://www.codefellows.org/">Code Fellows</a></h2>
          <div class="circular"></div>
          <h3>
            <Link href="/about">About</Link>
          </h3>
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
          <p>Hi I am Emre! I love web develeopment reading docs and programming books.
             on my spare time I enjoy riding my bike, taking picture and spending quality
             time with the close ones.

             I have had many hobbies in the past, from film making to downhill skateboarding.
             But I have discovered web development and I believe that this hobby might keep
             me busy for the rest of my life. There is never a lack of something new to learn.

             I share new and exciting things I learn on my <a href="https://medium.com/@emresurmeli"> Blog</a>.
          </p>
        </div>
      </div>
    )
  }
})

React.renderComponent(App(), document.body);
