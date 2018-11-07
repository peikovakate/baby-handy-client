import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class ChatBotComponent extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }
 
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    let response = 'some response from server'
    addResponseMessage(response);
  } 


  render() {
    return (
      <div className="App">
        <p>Here is a chat</p>
      <Widget
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}

export default ChatBotComponent

