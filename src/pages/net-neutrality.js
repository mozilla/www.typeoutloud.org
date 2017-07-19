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
          shareProgress="http://share.mozilla.org/352/181993"
          header="Without Net Neutrality ..."
          placeholder="share your thoughts"
          channel="email"
          initContext={true}
          page="net-neutrality"
          abort={process.env.ABORT_NET_NEUTRALITY}
          abortCopy={(
            <p>Thank you for sharing your ideas! We'll be creating a set of posters from our favorites soon. Follow us on <a href="https://www.facebook.com/mozilla">Facebook</a>, <a href="https://twitter.com/mozilla">Twitter</a> or <a href="https://medium.com/mozilla-internet-citizen">Medium</a> to see the final results (and then print and share them)!</p>
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
          What would the Internet be without Net Neutrality? Share your ideas and we'll turn some favorites into a set of posters you can print or share on social media. Follow us on <a href="https://www.facebook.com/mozilla">Facebook</a>, <a href="https://twitter.com/mozilla">Twitter</a> or <a href="https://medium.com/mozilla-internet-citizen">Medium</a> to see the final results!
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
