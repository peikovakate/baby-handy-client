import React, { Component } from 'react';
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class ChatBotComponent extends Component {
  componentDidMount() {
    this.props.onRef(this)
    // addResponseMessage("Welcome to this awesome chat!");
  }
 
  handleNewUserMessage = (newMessage) => {
    console.log(`New message! ${newMessage}`);
    // Now send the message throught the backend API
    let response = 'some response from server'
    addResponseMessage(response);
  } 

  toggleChat(){
    toggleWidget()
    // chat.toggleWidget()
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }


  render() {
    return (
      <div>
      <Widget name='chat'  
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}

export default ChatBotComponent

