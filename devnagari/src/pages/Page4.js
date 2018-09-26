import React, { Component } from 'react';
import Header from '../components/Header';
import OutputCard from '../components/OutputCard';
class Page4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { profile, output, nextPage } = this.props;
    console.log(output);
    return (
      <div className="page4">
        <div className="header-container">
          <Header name={profile || 'Abi'} />
        </div>
        <div className="page4-padded" />
        <div className="output-container">
          <div className="output-headers">
            <div className="left">
              <h3>Recognised Text</h3>
            </div>
            <div className="right">
              <h3>Language</h3>
            </div>
          </div>
          <div className="output-card-container">
            <OutputCard >{output.nepali}</OutputCard>
          </div>
        </div>
        <div className="output-container">
          <div className="output-headers">
            <div className="left">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-card-container">
            <OutputCard >{output.english}</OutputCard>
          </div>
        </div>
        <div className="page4-padded" />

        <div className="retake-button-container">
          <div className="retake-button" onClick={() => nextPage()}>
            Retake
          </div>
        </div>
      </div>
    );
  }
}
export default Page4;
