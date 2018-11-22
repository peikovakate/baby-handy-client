import React, { Component } from "react"
import { connect } from 'react-redux';
import ChatBot from './ChatbotComponent'
import { userActions } from '../_actions';

class ChildList extends Component {
    constructor() {
        super();
        this.state = {
            active_child_id: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    child_btn_click(e) {
        e.preventDefault();

        // this.chatbot.toggleChat()
        // e.target.id - id of child
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
                <ChatBot onRef={ref => (this.chatbot = ref)} />
            </div>

        )
    }

}

function mapStateToProps(state) {
    // takes state from store?? picks only user data
    const { authentication } = state;
    const user = authentication
    return {
        user
    };
}

const connectedChildList = connect(mapStateToProps)(ChildList);
export { connectedChildList as ChildList };