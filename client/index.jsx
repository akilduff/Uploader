import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UploaderApp extends React.Component {
  constructor() {
    super ();
    this.state = {
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    debugger
    console.log('Hit Submit')
    console.log(e.target)
    const imageFile = document.querySelector('#file')
    console.log(imageFile)
    const file = imageFile.files[0];
    console.log(file)
    axios({
      method: 'post',
      url: '/uploader',
      data: file,
      headers: {
        'Content-Type': file.type
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            File:
            <input type="file" id="file" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
ReactDOM.render(<UploaderApp />, document.getElementById('app'))