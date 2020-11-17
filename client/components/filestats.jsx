import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

const FileSelector = styled.div`
  text-align: center;
  border: 2px solid DimGrey;
  padding: 0.5em 0em 0.5em 0em;
  margin: 0px 5px 0px 5px;
`;
const FileDetails = styled.div`
  margin: 5%;
`;
const SelectFile = styled(FileDetails)`
  font-weight: 350;
  text-align: center;
`;

class FileStats extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: null
    }

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
  }

  onFileChange(e) {
    console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileUpload() {
    var currentCount = {};
    for (var key in this.props.count) {
      currentCount[key] = this.props.count[key];
    }
    if (this.state.selectedFile) {
      if (this.state.selectedFile.type.includes('jpeg')) {
        currentCount.jpeg++
      } else if (this.state.selectedFile.type.includes('png')) {
        currentCount.png++
      } else if (this.state.selectedFile.type.includes('javascript')) {
        currentCount.javascript++
      } else if (this.state.selectedFile.type.includes('pdf')) {
        currentCount.pdf++
      } else {
        currentCount.other++
      }
      this.setState({
        count: currentCount
      })
      const formData = new FormData();
      formData.append(
        "sampleFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post("/uploader", formData)
        .then(() => {
          this.props.main()
        })
    } else {
      alert('Please select a file')
    }
  };

  fileData() {
    if (this.state.selectedFile) {
      return (
        <FileDetails>
          <h4>File Details:</h4>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </FileDetails>
      );
    } else {
      return (
        <FileDetails>
          <SelectFile>Choose a file before Pressing the Upload button</SelectFile>
        </FileDetails>
      );
    }
  };

  render () {
    return (
      <div>
        <FileSelector>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </FileSelector>
          {this.fileData()}
      </div>
    )
  }
}

export default FileStats;
