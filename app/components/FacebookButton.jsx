var React = require('react');

var FacebookButton = React.createClass({
   // constructor(props) {
   //    super(props);

   //    this.FB = props.fb;

   //    this.state = {
   //       message: ""
   //    };

   // },

   getInitialState: function() {
    return {
      message: 'Hello',
      username: ''
    };
  },

  componentDidMount: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '222018134798847',
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI: function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log('Successful login for: ' + response.id);
    this.setState({username: response.id});
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  },

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback: function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  },

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState: function() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  },

  handleClick: function() {
    FB.login(this.checkLoginState());
    console.log("Hello");
  },

  //  componentDidMount() {
  //     this.FB.Event.subscribe('auth.logout', 
  //        this.onLogout.bind(this));
  //     this.FB.Event.subscribe('auth.statusChange', 
  //        this.onStatusChange.bind(this));
  //  },
      
  //  onStatusChange(response) {
  //     console.log( response );
  //     var self = this;

  //     if( response.status === "connected" ) {
  //        this.FB.api('/me', function(response) {
  //           var message = "Welcome " + response.name;
  //           self.setState({
  //              message: message
  //           });
  //        })
  //     }
  //  },

  //  onLogout(response) {
  //     this.setState({
  //        message: ""
  //     });
  //  },

   render() {
      return (
         <div>
            <a href="#" onClick={this.handleClick}>
            LOG IN!</a>
         </div>
      );
   }
});

module.exports = FacebookButton;