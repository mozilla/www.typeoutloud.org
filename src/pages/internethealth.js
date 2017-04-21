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
    var search = location.search;
    var channel = "email";
    if (search) {
      search = search.replace("?", "");
      search = search.split("&");
      search.forEach(function(item) {
        item = item.split("=");
        if (item[0] === "channel") {
          if (item[1] === "social" || item[1] === "snippet" || item[1] === "email") {
            channel = item[1];
          }
        }
      });
    }
    return (
      <div className="internethealth-page page">
        <MadLib
          pageTitle="internethealth"
          shareProgress="https://share.mozilla.org/352/180435"
          header="A healthy Internet is ..."
          placeholder="share your thoughts"
          channel={channel}
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
          Thanks for sharing. <span className="logo">mozilla</span> made this because we <i className="fa fa-heart fa-1x" aria-hidden="true"></i> the internet. Help keep it healthy by <a href="https://share.mozilla.org/352/180435">sharing</a> with your friends. Learn more about internet health <a href="https://internethealthreport.org/" onClick={this.shareProgressClick}>here</a>.
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
