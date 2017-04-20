import React  from 'react';
import reactGA from 'react-ga';
import sheets from '../lib/sheets.js';

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
      scrollPercentages: [0, 25, 50, 75, 100],
      waiting: false,
      rows: [],
      tempField: ""
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
    sheets.read({
      channel: this.state.channel,
      sheet: this.state.readSheet
    }, (data) => {

      var rows = data.rows;
      var guid = data.guid;
      if (guid !== this.state.previousGuid && !this.state.paused) {
        this.setState({
          previousGuid: guid,
          rows,
          tempField: ""
        });
      }
      callback();
    });
  },
  keyDown: function(e) {
    var value = this.inputElement.value.trim().slice(0, 50);
    if(value && e.keyCode === 13) {

      reactGA.event({
        category: "User Flow",
        action: "Submitted madlib",
        label: value
      });

      this.inputElement.value = '';
      clearTimeout(this.state.timeOut);
      this.setState({
        timeOut: null,
        waiting: true
      }, () => {
        this.updateOutput(() => {
          sheets.write({
            field: value,
            sheet: this.state.writeSheet,
            entry: this.state.entry
          }, () => {
            this.setState({
              timeOut: window.setTimeout(this.updateOutputTimeout, 4000),
              tempField: value,
              waiting: false
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
  renderRows: function() {
    var tempElement = null;
    if (this.state.waiting) {
      tempElement = (
        <div className="waiting">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      );
    } else if (this.state.tempField) {
      tempElement = (
        <div>{this.state.tempField}</div>
      );
    }
    return (
      <div className="output-container">
        {tempElement}
        {
          this.state.rows.map(function(row, index) {
            return (
              <div key={"row-" + index}>{row.field}</div>
            );
          })
        }
      </div>
    );
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
          <input disabled={this.state.waiting ? "disabled" : false} onKeyDown={this.keyDown} ref={(input) => { this.inputElement = input; }} maxLength="50" className="input" type="text" placeholder={this.props.placeholder}></input>
          <div className="share-container">
            <a href={this.props.shareProgress} onClick={this.shareProgressClick}>
              <img src="./assets/images/share-icon.png"/>
            </a>
          </div>
        </div>
        {this.renderRows()}
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
