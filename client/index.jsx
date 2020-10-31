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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({name: event.target.value});
  }

  handleSubmit(e) {
    const formData = new FormData
    const fileSelector = document.querySelector('#samplefile')
    const file = fileSelector.files[0];
    console.log(file)
    axios({
      method: 'post',
      url: '/',
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
        <form ref='uploadForm'
          id='uploadForm'
          action='/'
          method='post'
          encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
        </form>
      </div>
    )
  }
}
ReactDOM.render(<UploaderApp />, document.getElementById('app'))
