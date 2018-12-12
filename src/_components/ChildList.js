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
                    {!this.props['user'].user.children.length>0 && 
                        <div className='card' style={{marginTop:20, padding: 20 }}>
                            You don't have any child registered. 
                            Please, add them <a href='/addchild'>here</a>.
                        </div>
                        }
                    <div class="col s12 cards-container">
                        {this.props['user'].user.children.map(children =>
                            <div className='card' 
                                style={{ margin: 20 }} 
                                key={children.child_id} 
                                id={children.child_id}>
                                <div className="card-content">
                                    <p style={{fontSize:18, margin:10}}>
                                        <span id='niceText'>Name: </span>
                                        &emsp; {children.name} &emsp;
                                        <span id='niceText'>Birthday: </span> 
                                        &emsp; {children.birthday}
                                    </p>
                                </div>
                                <div className="card-action" >
                                        
                                            <button className="btn waves-effect waves-light cyan lighten-1"
                                                id={children.child_id}
                                                onClick={this.child_btn_click.bind(this)}
                                                style={{margin:10}}>
                                                Start conversation
                                            </button>
                                            <button className="btn waves-effect waves-light cyan lighten-1"
                                                id={children.child_id}
                                                onClick={this.handleSubmit}
                                                style={{margin:10}} >
                                                Remove child
                                            </button>
                                 
                                    </div>
                    
                            </div>
                            )}

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