import React, { Component } from "react"
import { connect } from 'react-redux';
import { ChatBot } from './ChatbotComponent'
import { userActions } from '../_actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toggleWidget } from 'react-chat-widget';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ChildList extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { child_id: null }
    }

    handleSubmit(e) {
        e.preventDefault();
        const child_id = e.target.id;
        const { dispatch } = this.props;
        confirmAlert({
            //title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(userActions.deleteChild(child_id))
                },
                {
                    label: 'No',
                }
            ]
        })

    }

    child_btn_click(e) {
        e.preventDefault();
        const child_id = parseInt(e.target.id)
        if (this.state.child_id !== child_id) {
            this.props.dispatch(userActions.change_child(child_id));
            this.setState({ child_id: child_id })
        }
        var hasClass = document.getElementsByClassName('rcw-conversation-container')
        if (hasClass.length === 0) {
            toggleWidget()
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="">
                        {this.props['user'].user.children.map(children =>
                            <div className='card-panel' style={{ margin: 20 }} key={children.child_id} id={children.child_id}>
                                <div className="card-content">
                                    <p>
                                        <b>Name:&emsp;</b>{children.name}, {children.birthday}
                                    </p>
                                </div>
                                <div className="card-action" >
                                    <div className="row">
                                        <div className="col s12 l6">
                                            <button className="btn waves-effect waves-light cyan lighten-1"
                                                id={children.child_id}
                                                onClick={this.child_btn_click.bind(this)}>
                                                Start conversation
                                            </button>
                                        </div>
                                        <div className="col s12 l6">
                                            <button className="btn waves-effect waves-light cyan lighten-1"
                                                id={children.child_id}
                                                onClick={this.handleSubmit}>
                                                Remove child
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                    </div>
                    <ChatBot />
                </div>
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