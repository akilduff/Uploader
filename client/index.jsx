import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UploaderApp extends React.Component {
  constructor() {
    super ();
    this.state = {
      selectedFile: null
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
  }

  onFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload() {
    const formData = new FormData();
    formData.append(
      "sampleFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios.post("/uploader", formData);
  };

  fileData() {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
          <h1>
            Uploader
          </h1>
          <h3>
            File Upload using React with Three.js output based on file type.
          </h3>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
}

ReactDOM.render(<UploaderApp />, document.getElementById('app'))
