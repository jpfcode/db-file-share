import React, { Component } from 'react';

export default class SingleFile extends Component {
   constructor(props) {
      super(props);

      this.state = {
         file: {}
      }

      this.handleDownload = this.handleDownload.bind(this);
   }

   handleDownload(event) {
      const url = window.URL.createObjectURL(this.state.file);
      const link = document.createElement("a");
      link.download = this.state.file.name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
   }

   componentDidMount() {
      fetch(`http://127.0.0.1:5000/file/get/${this.props.id}`, { method: "GET" })
         .then(response => response.blob())
         .then(data => {
            const file = new File([data], this.props.name, { type: this.props.type })
            this.setState({ file: file })
         })
         .catch(error => console.log(error))
   }

   render() {
      if (this.state.file) {
         return (
            <div className='single-file-wrapper'>
               <h2>{this.state.file.name}</h2> <button onClick={this.handleDownload}>Download</button>
            </div>
         )
      } else {
         return (
            <div className='single-file-wrapper'>
               <h2>Loading...</h2>
            </div>
         )
      }
   }
}