import React, { Component } from "react"
import { connect } from 'react-redux';
import { ChatBot } from './ChatbotComponent'
import { userActions } from '../_actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
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
    }

    render() {
        return (
            <div class="row">
                <div className="col s6">
                        {this.props['user'].user.children.map(children =>
                            <div className='card-panel' key={children.child_id} id={children.child_id}>
                            <div class="card-content">
                                <p><b>ID:&emsp;</b>{children.child_id}<b>
                                    &emsp;&emsp;&emsp;&emsp; Name:&emsp;</b>{children.name}
                                </p>
                                </div>
                                <div className="card-action" >
                                    <div className="row">
                                    <div className="col s4">
                                    <button className="btn waves-effect waves-light cyan lighten-1"
                                        id={children.child_id}
                                        onClick={this.handleSubmit}>
                                        Delete child
                                    </button>
                                    </div>
                                    <button className="btn waves-effect waves-light cyan lighten-1"
                                        id={children.child_id}
                                        onClick={this.child_btn_click.bind(this)}>
                                        Start conversation
                                    </button>
                                    </div>
                                </div>
                            </div>)}
                    
                </div>
                <ChatBot />
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