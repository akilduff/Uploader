import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import * as THREE from 'three';
import styled from 'styled-components'

const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  padding: 1em;
`;
const Lede = styled.div`
  text-align: center;
  font-size: 20px;
  font-style: italic;
  padding: 1em;
`;
const FileSelector = styled.div`
  text-align: center;
  border: 2px solid DimGrey;
  padding: 0.5em 0em 0.5em 0em;
  margin: 0px 5px 0px 5px;
`;
const FileVisual = styled(FileSelector)`
  padding: 0em;
`;
const FileDetails = styled.div`
  margin: 5%;
`;
const SelectFile = styled(FileDetails)`
  font-weight: 350;
  text-align: center;
`;

class UploaderApp extends React.Component {
  constructor() {
    super ();
    this.state = {
      selectedFile: null,
      count: {
        jpeg: 0,
        png: 0,
        javascript: 0,
        pdf: 0,
        other: 0
      }

    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
    this.main = this.main.bind(this);
  }

  componentDidMount() {
    axios.get('/uploader')
      .then((response) => {
        this.setState({
          count: response.data
        })
      })
      .then(() => {
        this.main()
      })
  }

  onFileChange(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileUpload() {
    var currentCount = {};
    for (var key in this.state.count) {
      currentCount[key] = this.state.count[key];
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
          this.main()
        })
    } else {
      alert('Please select a file')
    }
  };

  main() {
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
    const scene = new THREE.Scene();
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    function makeCube(count, x) {
      if (count === 0) {
        var selectedColor = 0x6b6b6b;
        var boxDim = 0.1;
      } else {
        var selectedColor = 0x44aa88;
        var boxDim = count/10;
      }
      const geometry = new THREE.BoxGeometry(boxDim, boxDim, boxDim);
      const material = new THREE.MeshPhongMaterial({color: selectedColor});  // greenish blue
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = x;
      return cube;
    }

    function makeTetra(count, x) {
      if (count === 0) {
        var selectedColor = 0x6b6b6b;
        var radius = 0.1;
      } else {
        var selectedColor = 0xffff00;
        var radius = count/10;
      }
      const geometry = new THREE.TetrahedronGeometry(radius);
      const material = new THREE.MeshPhongMaterial({color: selectedColor});  // greenish blue
      const tetra = new THREE.Mesh(geometry, material);
      scene.add(tetra);
      tetra.position.x = x;
      return tetra;
    }

    function makeDode(count, x) {
      if (count === 0) {
        var selectedColor = 0x6b6b6b;
        var radius = 0.1;
      } else {
        var selectedColor = 0xff0000;
        var radius = count/10;
      }
      const geometry = new THREE.DodecahedronGeometry(radius);
      const material = new THREE.MeshPhongMaterial({color: selectedColor});  // greenish blue
      const dode = new THREE.Mesh(geometry, material);
      scene.add(dode);
      dode.position.x = x;
      return dode;
    }

    function makeCylinder(count, x) {
      if (count === 0) {
        var selectedColor = 0x6b6b6b;
        var radius = 0.1;
      } else {
        var selectedColor = 0x00fff9;
        var radius = count/10;
      }
      const geometry = new THREE.CylinderGeometry(radius, radius, radius*2, radius*20);
      const material = new THREE.MeshPhongMaterial({color: selectedColor});  // greenish blue
      const cylinder = new THREE.Mesh(geometry, material);
      scene.add(cylinder);
      cylinder.position.x = x;
      return cylinder;
    }

    function makePan(count, x) {
      if (count === 0) {
        var selectedColor = 0x6b6b6b;
        var radius = 0.1;
      } else {
        var selectedColor = 0xffa500;
        var radius = count/10;
      }
      const geometry = new THREE.ConeGeometry(radius, radius*2, radius*2);
      const material = new THREE.MeshPhongMaterial({color: selectedColor});  // greenish blue
      const pan = new THREE.Mesh(geometry, material);
      scene.add(pan);
      pan.position.x = x;
      return pan;
    }

    const shapes = [
      makeCube(this.state.count.jpeg, -4),
      makeTetra(this.state.count.png, -2),
      makeDode(this.state.count.javascript, 0),
      makeCylinder(this.state.count.pdf, 2),
      makePan(this.state.count.other, 4)
    ]

    function render(time) {
      time *= 0.0007;
      shapes.forEach((shape) => {
        const speed = 1;
        const rot = time * speed;
        shape.rotation.x = rot;
        shape.rotation.y = rot;
      })
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

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

  render() {
    return (
      <div>
        <TitleRow>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
          <Title>Uploader</Title>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </TitleRow>
          <Lede>
            Upload a file to see a Three.js rendered output based on file types within the MySQL database
          </Lede>
          <FileSelector>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </FileSelector>
        {this.fileData()}
        <FileVisual>
          <canvas id="c"></canvas>
        </FileVisual>
      </div>
    );
  }
}

ReactDOM.render(<UploaderApp />, document.getElementById('app'))
