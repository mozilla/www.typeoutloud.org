import React  from 'react';

import MadLib from '../components/mad-lib.js';

var Science = React.createClass({
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
      <div className="internethealth-page">
        <MadLib
          header="placeholder"
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
          Placeholder
        </MadLib>
      </div>
    );
  }
});

module.exports = Science;
