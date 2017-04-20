import React  from 'react';
import reactGA from 'react-ga';

function addToSheets(data, callback) {
  var http = new XMLHttpRequest();
  var url = "/api/sheets/add/";
  callback = callback || function() {};

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback("success");
    }
  };

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(data));
}

function readFromSheets(data, callback) {
  var http = new XMLHttpRequest();
  var url = "/api/sheets/read/";
  callback = callback || function() {};

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.responseText);
      callback(result);
    }
  };

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(data));
}

var MadLib = React.createClass({
  getInitialState: function() {
    var channel = this.props.channel;
    var writeSheet = this.props.sheets.write[channel];
    var readSheet = this.props.sheets.read[channel];
    document.title = "typeoutloud.org | " + this.props.pageTitle;

    return {
      contextClosed: false,
      paused: false,
      channel,
      writeSheet: writeSheet,
      readSheet: readSheet,
      entry: this.props.sheets.entry,
      previousGuid: "",
      timeout: window.setTimeout(this.updateOutputTimeout),
      highestScroll: 0,
      scrollPercentages: [0, 25, 50, 75, 100]
    };
  },
  updateOutputTimeout: function() {
    this.updateOutput(() => {
      this.setState({
        timeOut: window.setTimeout(this.updateOutputTimeout, 4000)
      });
    });
  },
  updateOutput: function(callback) {
    callback = callback || function() {};
    var cacheElement = document.createElement("div");
    var waitingElement;
    readFromSheets({
      channel: this.state.channel,
      sheet: this.state.readSheet
    }, (data) => {

      var rows = data.rows;
      var guid = data.guid;
      if (guid !== this.state.previousGuid && !this.state.paused) {
        var waitingElement = document.querySelector(".waiting");

        if (waitingElement) {
          cacheElement.appendChild(waitingElement);
        }
        rows.forEach(function(row){
          var rowElement = document.createElement('div');
          rowElement.textContent = row.field;
          cacheElement.appendChild(rowElement);
        });
        this.outputContainer.innerHTML = cacheElement.innerHTML;
        this.setState({
          previousGuid: guid
        });
      }
      callback();
    });
  },
  waiting: function(on) {
    if (on) {
      this.inputElement.disabled = true;
      var rowElement = document.createElement('div');
      var firstChild = this.outputContainer.firstChild;
      rowElement.innerHTML = "<span>.</span><span>.</span><span>.</span>";
      rowElement.classList.add("waiting");
      if (!firstChild) {
        this.outputContainer.appendChild(rowElement);
      } else {
        this.outputContainer.insertBefore(rowElement, this.outputContainer.firstChild);
      }
    } else {
      this.inputElement.disabled = false;
      var waitingElement = document.querySelector(".waiting");
      if (waitingElement && waitingElement.parentNode) {
        waitingElement.parentNode.removeChild(waitingElement);
      }
    }
  },
  keyDown: function(e) {
    var value = this.inputElement.value.trim().slice(0, 50);
    if(value && e.keyCode === 13) {

      reactGA.event({
        category: "User Flow",
        action: "Submitted madlib",
        label: value
      });

      this.waiting(true);
      this.inputElement.value = '';
      clearTimeout(this.state.timeOut);
      this.setState({
        timeOut: null
      }, () => {
        this.updateOutput(() => {
          addToSheets({
            field: value,
            sheet: this.state.writeSheet,
            entry: this.state.entry
          }, () => {
            this.waiting(false);
            var rowElement = document.createElement('div');
            var firstChild = this.outputContainer.firstChild;
            rowElement.textContent = value;
            if (!firstChild) {
              this.outputContainer.appendChild(rowElement);
            } else {
              this.outputContainer.insertBefore(rowElement, this.outputContainer.firstChild);
            }
            this.setState({
              timeOut: window.setTimeout(this.updateOutputTimeout, 4000)
            });
          });
        });
      });
    }
  },
  shareProgressClick: function() {
    reactGA.event({
      category: "Social",
      action: "Clicked on icon share",
      label: "ShareProgress"
    });
  },
  trackScroll: function(scrollY) {
    var scrollMax = document.body.offsetHeight - window.innerHeight;
    var scrollPercent = scrollY / scrollMax * 100;
    var nextScrollPercent;
    while (scrollPercent >= this.state.scrollPercentages[0]) {
      nextScrollPercent = this.state.scrollPercentages.shift();
      reactGA.event({
        category: "User Flow",
        action: "User scrolled madlib",
        label: nextScrollPercent + "%"
      });
    }

    this.setState({
      highestScroll: scrollY
    });
  },
  componentDidMount: function() {
    this.inputElement.focus();
    window.addEventListener("scroll", () => {
      var paused = false;
      var scrollY = window.scrollY;
      if (scrollY !== 0) {
        paused = true;
      }
      this.setState({
        paused
      });

      if (scrollY > this.state.highestScroll) {
        this.trackScroll(scrollY);
      }
    });
  },
  closeContext: function() {
    reactGA.event({
      category: "User Flow",
      action: "Context menu closed",
      label: ""
    });

    this.setState({
      contextClosed: true
    });
  },
  render: function() {
    var contextClassName = "thankyou";
    if (this.state.contextClosed) {
      contextClassName += " hidden";
    }
    return (
      <div>
        <div className="header-container">
          <h1>{this.props.header}</h1>
          <input onKeyDown={this.keyDown} ref={(input) => { this.inputElement = input; }} maxLength="50" className="input" type="text" placeholder={this.props.placeholder}></input>
          <div className="share-container">
            <a href={this.props.shareProgress} onClick={this.shareProgressClick}>
              <img src="./assets/images/share-icon.png"/>
            </a>
          </div>
        </div>
        <div ref={(input) => { this.outputContainer = input; }} className="output-container"></div>
        <div className={contextClassName}>
          <img onClick={this.closeContext} className="close" src="./assets/images/close.png" alt="close icon"/>
          <p>
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = MadLib;
