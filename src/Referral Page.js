import React, { Component } from "react";
import "antd/dist/antd.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tag, Form, Icon, Input, Button, Checkbox, Progress } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './front page.jpg';
import alpaca from './alpaca-icon.png';
import Sharebutton from './sharebutton.js';
import Likebutton from './Likebutton.js';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
} = ShareButtons;

export default class ReferralPage extends Component {


  state = { 
    uniqueLink: "https://www.pakaprelaunch.com/AHt7s",
    counter: 3
  
  };

  render() {
    return (
      <div className="ref_background">
        <div className="referralpage">
          <Sharebutton/>
          <Likebutton />
          <div className='counterbox'>
          <img    className='counterbox'
                  src= {alpaca}
                  height="60"
                  width="50"
                />
          <h1 className="counter"> {this.state.counter} </h1>
          </div>
          <h1 className="subtext"> You're In! </h1>
          <br />
          <h3 className="subtext">
            {" "}Here's your unique referral link to earn giveaways by inviting
            friends!
            {" "}
          </h3>
          <br />
          <CopyToClipboard
            text={this.state.uniqueLink}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button 
            ghost
            size='large'
            onClick={() => this.state.counter += 1}
            >
            
            {this.state.uniqueLink}
            
            
            </Button>
          </CopyToClipboard>
          <div className="subtext">
            tap to copy!
            </div>
        </div>
      </div>
    );
  }
}
