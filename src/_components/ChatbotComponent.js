import React, { Component } from 'react';
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class ChatBotComponent extends Component {
  constructor(props){
    super(props);
    
  }


  componentDidMount() {
    // addResponseMessage("Welcome to this awesome chat!");
  }
 
  // handleNewUserMessage = (newMessage) => {
  //   // console.log(`New message! ${newMessage}`);
  //   // Now send the message throught the backend API
  //   // let response = 'some response from server'
  //   // addResponseMessage(response);
  // } 


  addResponse(message){
    addResponseMessage(message);
  }

  toggleChat(){
    toggleWidget()
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

