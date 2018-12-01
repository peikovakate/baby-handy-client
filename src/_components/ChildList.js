import React, { Component } from "react"
import { connect } from 'react-redux';
import { ChatBot } from './ChatbotComponent'
import { userActions } from '../_actions';

class ChildList extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {child_id: null}
    }

    handleSubmit(e) {
        e.preventDefault();
        const child_id = e.target.id;
        const { dispatch } = this.props;
        dispatch(userActions.deleteChild(child_id));
    }

    child_btn_click(e) {
        e.preventDefault();
        const child_id = parseInt(e.target.id)
        if (this.state.child_id !== child_id) {
            this.props.dispatch(userActions.change_child(child_id));
            this.setState({child_id: child_id})
        }
    }    

    render() {
        return (
            <div >
                <ul className="collection">
                    {this.props['user'].user.children.map(children =>
                        <li key={children.child_id} className="collection-item"
                            id={children.child_id}>
                            <p>ID: {children.child_id}, Name: {children.name} </p>

                                <button className="btn waves-effect waves-light" 
                                    id={children.child_id} 
                                    onClick={this.handleSubmit}>
                                    Delete child
                                </button>
                                <button className="btn waves-effect waves-light" 
                                    id={children.child_id} 
                                    onClick={this.child_btn_click.bind(this)}>
                                    Start conversation
                                </button>
                            </li>)
                    }
                </ul>
                <ChatBot/>
            </div>  

        )
    }

}

function mapStateToProps(state) {
    // takes state from store?? picks only user data
    const { authentication, chatbot, chooseChildToTalkReducer } = state;
    const user = authentication
    const chatbot_state = chatbot
    return {
        user,
        chatbot_state,
        chooseChildToTalkReducer
    };
}

const connectedChildList = connect(mapStateToProps)(ChildList);
export { connectedChildList as ChildList };