import React, { Component } from 'react';

import FileShare from './pages/file-share/file-share';
import AuthComponent from './pages/login/auth';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <AuthComponent />
      </div>
    );
  }
}
