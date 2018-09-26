import React, { Component } from 'react';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Icon } from 'react-icons-kit';
import { camera } from 'react-icons-kit/fa/camera';
import { upload } from 'react-icons-kit/fa/upload';

import axios from 'axios';
import { isMobile } from 'react-device-detect';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: '', photo: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ photo: e.target.result, loading: true });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', file, file.name);
    axios
      .post('/upload', formData)
      .then(res => {
        console.log(res);
        if (res.data) {
          this.props.setOutput(res.data);
          this.props.nextPage();
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.setState({ loading: false, photo: '' });
  }

  render() {
    const { profile } = this.props;
    const { loading } = this.state;

    return (
      <div className="page2">
        <div className="header-container">
          <Header name={profile || 'Abi'} />
        </div>
        <div className="page2-camera">
          <div className="image-upload">
            {!this.state.photo && (
              <span>
                {isMobile && (
                  <label htmlFor="file-input" className="icon-color">
                    <Icon size={'25%'} icon={camera} />
                  </label>
                )}
                {isMobile && <h1 style={{ textAlign: 'center', width: '100%' }}>OR</h1>}
                <label htmlFor="file-input2" className="icon-color">
                  <Icon size={'25%'} icon={upload} />
                </label>
              </span>
            )}
            <input id="file-input" type="file" accept="image/*" capture onChange={this.handleChange} className="" />
            <input id="file-input2" type="file" accept="image/*" onChange={this.handleChange} className="" />
          </div>
          {this.state.photo && <img src={this.state.photo} className="cam" alt="" />}
        </div>
        <div className="page2-camera-clicker-container">{loading && <Loader />}</div>
      </div>
    );
  }
}
export default Page2;
