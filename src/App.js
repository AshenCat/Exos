import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Header from './components/layout/Header'
import Content from './components/Content'
import Footer from './components/layout/Footer';

export default class App extends React.Component {
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Content />
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
};
