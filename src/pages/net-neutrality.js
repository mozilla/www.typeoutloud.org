import React  from 'react';
import MadLib from '../components/mad-lib.js';
import reactGA from 'react-ga';

var Science = React.createClass({
  shareProgressClick: function() {
    reactGA.event({
      category: "Social",
      action: "Clicked on link share",
      label: "ShareProgress"
    });
  },
  render: function() {
    var query = this.props.location.query;
    var email = query.channel;
    
    return (
      <div className="net-neutrality-page page">
        <MadLib
          pageTitle="Stand up for Net Neutrality"
          shareProgress="#"
          header="Without Net Neutrality ..."
          placeholder="share your thoughts"
          channel="email"
          initContext={true}
          page="net-neutrality"
          abort={process.env.ABORT_NET_NEUTRALITY}
          abortCopy={(
            <p>Thank you for sharing your Net Neutrality ideas! We will design a set of posters from our favorites. Follow us on <a href="https://twitter.com/mozilla">Twitter</a> to see the final products (and then print and share them)!</p>
          )}
          sheets={{
            entry: "822808207",
            write: {
              email: "1FAIpQLScPAO4llbhjRStCH2Tv8oYt370W_2JujaqeZ0uEUArFz86SCA"
            },
            read: {
              email: "1cJNARTm12oLmaQfvC1223c2K1WRKpSFIErWJZ5PYhjw"
            }
          }}
        >
          Tell us what life would be without Net Neutrality. We will design a set of posters from our favorites. Follow us on Twitter to see the final products (and then print and share them)!
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
