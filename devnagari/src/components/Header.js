import React, { Component } from 'react';

  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

  
    render() {
      const {name} = this.props;
      return (
      <div className="header">
        <div className="header-main-app-name"><h3>Devanagari OCR Model</h3></div>
        <div className="header-incoming-name"><h3>{name}</h3></div>
      </div>
      );
    }
  }
  export default Header;
    