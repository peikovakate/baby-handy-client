import React, { Component } from "react"
import { connect } from 'react-redux';
import ChatBot from './ChatbotComponent'
import { userActions } from '../_actions';

class ChildList extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.user_entered_message.bind(this.chatbot.handleNewUserMessage)
    }
    state = {

    }
    

    componentWillReceiveProps(nextProps) {
        console.log('Props CHANGED', nextProps['chatbot_state'])
        const chat_state =  nextProps['chatbot_state']
        if (chat_state.message){
            this.chatbot.addResponse(chat_state.message)
        }
        
    }

    user_entered_message(message){
        console.log(message)
    }

    child_btn_click(e) {
        // e.preventDefault();
        // const child_data ={
        //     child_id: parseInt(e.target.id)
        // }

        // // this.chatbot.toggleChat()
        // const { dispatch } = this.props;
        // dispatch(userActions.start_conversation(child_data));
    }

    handleSubmit(e) {
        e.preventDefault();
        const child_id = e.target.id;
        const { dispatch } = this.props;
        dispatch(userActions.deleteChild(child_id));


    }

    render() {
        return (
            <div >
                <ul className="collection">
                    {this.props['user'].user.children.map(children =>
                        <a href=' ' key={children.child_id} className="collection-item"
                            id={children.child_id} onClick={this.child_btn_click}>
                            ID: {children.child_id}, Name: {children.name}  <button className="btn waves-effect waves-light" id={children.child_id} onClick={this.handleSubmit}>Delete child</button></a>)
                    }
                </ul>
                <ChatBot ref={c => (this.chatbot = c)} />
            </div>

        )
    }

}

function mapStateToProps(state) {
    // takes state from store?? picks only user data
    const { authentication, chatbot } = state;
    const user = authentication
    const chatbot_state = chatbot
    return {
        user,
        chatbot_state
    };
}

const connectedChildList = connect(mapStateToProps)(ChildList);
export { connectedChildList as ChildList };