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

    var share = query.share;

    // share "a"
    var shareProgress = "http://share.mozilla.org/352/180499";
    if (share === "b") {
      shareProgress = "http://share.mozilla.org/352/180553";
    } else if (share === "c") {
      shareProgress = "http://share.mozilla.org/352/180554";
    }

    return (
      <div className="internethealth-page page">
        <MadLib
          pageTitle="internethealth"
          initContext={false}
          shareProgress={shareProgress}
          header="A healthy Internet is ..."
          placeholder="share your thoughts"
          channel={channel}
          page="internethealth"
          abort={process.env.ABORT_INTERNETHEALTH}
          abortCopy={(
            <p>Thanks for caring about internet health.</p>
          )}
          sheets={{
            entry: "822808207",
            write: {
              email: "1FAIpQLSfP0QdsqNx6xiLg49Iv2_C0HCAjrCRoHOv27znQ-O8rnRy1gg"
            },
            read: {
              email: "1klcqGFj85kTf5IxVLF9rle7hqwlWhHe-mT8tWrxknKE"
            }
          }}
        >
          Thanks for sharing. <span className="logo">mozilla</span> made this because we <i className="fa fa-heart fa-1x" aria-hidden="true"></i> the internet. Help keep it healthy by <a href={shareProgress}>sharing</a> with your friends. Learn more about internet health <a href="https://internethealthreport.org/" onClick={this.shareProgressClick}>here</a>.
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
