import React, { Component } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page4 from './Page4';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 1, profile: '', output: {}, image: '' };
    this.setActive = this.setActive.bind(this);
    this.setOutput = this.setOutput.bind(this);
  }

  setActive(val) {
    this.setState({ active: val });
  }
  setProfile(name) {
    this.setState({ profile: name });
  }
  setOutput(output) {
    this.setState({output:output});
  }

  render() {
    const { active, profile, output } = this.state;
    return (
      <div className="App">
        {active === 1 && <Page1 nextPage={() => this.setActive(2)} />}
        {active === 2 && <Page2 nextPage={() => this.setActive(3)} profile={profile} setOutput={this.setOutput} />}
        {active === 3 && <Page4 nextPage={() => this.setActive(2)} profile={profile} output={output} />}
        {/* <button
          style={{
            position: 'fixed',
            padding: '5px',
            borderRadius: '1em',
            color: '#fff',
            backgroundColor: 'black',
            marginTop: '50vh',
            marginLeft: '90vw',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            opacity: '0.4',
            zIndex: '20'
          }}
          onClick={() => this.setActive(this.state.active === 3 ? 1 : this.state.active + 1)}
        >
          >
        </button> */}
      </div>
    );
  }
}
export default Container;
