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
    var channel = query.channel;
    if (channel !== "social" || channel !== "email" || channel !== "snippet") {
      channel = "email";
    }

    return (
      <div className="science-page page">
        <MadLib
          pageTitle="Stand up for science"
          shareProgress="#"
          header="Stand up for science"
          placeholder="share your idea"
          channel={channel}
          initContext={true}
          page="science"
          abort={process.env.ABORT_SCIENCE}
          abortCopy={(
            <p>Thank you for sharing your March for Science slogan ideas! We will design a set of posters from our favorites. Follow us on <a href="https://twitter.com/mozilla">Twitter</a> to see the final products (and then print and share them)!</p>
          )}
          sheets={{
            entry: "822808207",
            write: {
              email: "1FAIpQLSfpus8QLCU9XWuDKtv4YUqudjCHoWdnPG5gUh-5RqpSkbR3aQ"
            },
            read: {
              email: "1seK0ySZrJA3Qo-U0_UwMimmwWJ_slKr0mVeIbCPxuq8"
            }
          }}
        >
          Support the March for Science by sharing a clever science-themed slogan. We will design a set of posters from our favorites. Follow us on Twitter to see the final products (and then print and share them)!
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
