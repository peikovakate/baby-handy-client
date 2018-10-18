import React from "react"
import ChatBot from 'react-simple-chatbot';
import ServerMessege from './ServerMessege'

const chat_bot_steps=[
    {
      id: '1',
      message: 'You can here add custom components',
      trigger: '2',
    },
    {
      id: '2',
      component: (
        <ServerMessege messege_text='Some text from server'/>
      ),
      trigger: '3',
      asMessage: true,
    },
    {
        id: '3',
        user: true,
        trigger: '2',
      },
  ]

const ChatBotComponent = props => (
    <div>
        <p>This is a chat bot component</p>
        <ChatBot steps = {chat_bot_steps}/>
    </div>
);

export default ChatBotComponent

