import React, { Component } from 'react';

import FileShare from './pages/file-share/file-share';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <FileShare />
      </div>
    );
  }
}
