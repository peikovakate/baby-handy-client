import React, { Component } from 'react';
import './App.css';
import ChatBot from "./components/ChatbotComponent"

class App extends Component {
  render() {
    return (
      <div>
        <p>This is baby-handy app </p>
        <ChatBot/>
      </div>

    );
  }
}

export default App;
