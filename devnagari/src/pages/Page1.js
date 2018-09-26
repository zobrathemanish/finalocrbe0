import React, { Component } from 'react';
import Header from '../components/Header';

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    if (val==4567) {
      this.props.nextPage();
    }

  }

  render() {
    return (
      <div className="page1">
        <div className="header-container">
          <Header name="" />
        </div>
        <div className="page1-content">
          <div className="page1-form-content">
            <div className="page1-form-empty" />
            <div className="page1-content-text">
              <h1>Enter Access Code</h1>
            </div>
            <div className="page1-input-field">
              <input type="number" className="page1-text-input" onChange={e => this.handleChange(e.target.value)} />
            </div>
            <div className="page1-form-empty" />
          </div>
        </div>
      </div>
    );
  }
}
export default Page1;
