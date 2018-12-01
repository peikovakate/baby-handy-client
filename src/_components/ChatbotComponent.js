import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Widget, addResponseMessage, toggleWidget, dropMessages } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { userActions } from '../_actions';

class ChatBotComponent extends Component {
  constructor(props) {
    super(props);
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this)
    this.state = {
      test_id: '',
      child_id: '',
    }
  }


  componentDidMount() {
    // addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message form user! ${newMessage}`);
    let lowercase_message = newMessage.toLowerCase()
    if (lowercase_message === 'yes' || lowercase_message === 'no') {
      const message_data = {
        ...this.state,
        'text': newMessage
      }
      const { dispatch } = this.props;
      console.log('Message data', message_data)
      dispatch(userActions.next_message(message_data))
    } else {
      addResponseMessage("Sorry, I don't understand you. Please, unswer 'Yes' or 'No'.")
    }

  } 

  componentWillReceiveProps(nextProps) {
    const chat_state =  nextProps['chatbot_state']
    if (chat_state.message){
        addResponseMessage(chat_state.message)
        this.setState({test_id: chat_state.test_id})
    }
    const chooseChildToTalk = nextProps['chooseChildToTalkReducer']
    if (chooseChildToTalk !== this.props.chooseChildToTalkReducer){
      dropMessages()
      this.setState({child_id: chooseChildToTalk.child_id})
      this.props.dispatch(userActions.start_conversation(chooseChildToTalk));
      // toggleWidget()
    }
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

function mapStateToProps(state) {
  const { authentication, chatbot, chooseChildToTalkReducer } = state;
  const user = authentication
  const chatbot_state = chatbot
  return {
      user,
      chatbot_state,
      chooseChildToTalkReducer
  };
}

const connectedChatBotComponent = connect(mapStateToProps)(ChatBotComponent);
export { connectedChatBotComponent as ChatBot };

