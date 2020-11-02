import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as THREE from 'three';

class UploaderApp extends React.Component {
  constructor() {
    super ();
    this.state = {
      selectedFile: null,
      selectedType: null
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
    this.main = this.main.bind(this);
  }

  onFileChange(e) {
    this.setState({
      selectedFile: e.target.files[0],
      selectedType: e.target.files[0].type
    });
  };

  onFileUpload() {
    if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append(
        "sampleFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post("/uploader", formData);
      this.main()
    } else {
      alert('Please select a file')
    }
  };

  main() {
    const fileType = this.state.selectedType;
    if (fileType.includes('jpeg')) {
      var selectedColor = 0x44aa88;
    } else if (fileType.includes('png')) {
      var selectedColor = 0xffff88;
    } else {
      var selectedColor = 0x999999;
    }
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new THREE.Scene();
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshBasicMaterial({color: selectedColor});  // greenish blue
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    function render(time) {
      time *= 0.001;  // convert time to seconds
      cube.rotation.x = time;
      cube.rotation.y = time;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

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
        <canvas id="c"></canvas>
      </div>
    );
  }
}

ReactDOM.render(<UploaderApp />, document.getElementById('app'))
