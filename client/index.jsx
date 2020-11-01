import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UploaderApp extends React.Component {
  constructor() {
    super ();
    this.state = {
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('Handle Change')
    if (this.state.submitted === false) {
      this.setState({submitted: true});
    } else {
      this.setState({submitted: false});
    }
  }

  render() {
    if (this.state.submitted === false) {
      return (
        <div>
          <form onSubmit={this.handleChange}
            ref='uploadForm'
            id='uploadForm'
            action='/'
            method='post'
            encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
          </form>
        </div>
      )
    } else if (this.state.submitted === true) {
      return (
        <div>
          <form onSubmit={this.handleChange}>
            <button type="submit">
              Upload Another
            </button>
          </form>
        </div>
      )
    }
  }
}
ReactDOM.render(<UploaderApp />, document.getElementById('app'))
