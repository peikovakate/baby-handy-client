import React from "react"
import ChatBot from 'react-simple-chatbot';

const chat_bot_steps=[
    {
      id: '1',
      message: 'You can here add custom components',
      trigger: '2',
    },
    {
      id: '2',
      component: (
        <div> This is a example component </div>
      ),
      asMessage: true,
      end: true,
    },
  ]

const ChatBotComponent = props => (
    <div>
        <p>This is a chat bot component</p>
        <ChatBot steps = {chat_bot_steps}/>
    </div>
);

export default ChatBotComponent

