import React, { Component } from 'react';

class OutputCard extends Component {
  render() {
    return (
      <div className="output-card">
      <div className="content">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default OutputCard;