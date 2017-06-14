import React, { Component} from 'react';
import FacebookProvider, { ShareButton } from 'react-facebook';
 
export default class Sharebutton extends Component {
  render() {
    return (
      <FacebookProvider appId="123456789">
        <ShareButton width='100' href="http://www.facebook.com" />
      </FacebookProvider>
    );
  }
}