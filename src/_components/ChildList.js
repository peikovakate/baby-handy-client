import React, { Component } from "react"
import { connect } from 'react-redux';
import ChatBot from './ChatbotComponent'

class ChildList extends Component {
    state = {
        active_child_id: null
    }

    child_btn_click(e) {
        e.preventDefault();
        // this.chatbot.toggleChat()
        // e.target.id - id of child
    }

    render() {
        return (
            <div >
                <ul className="collection">
                    {this.props['user'].user.children.map(children => 
                    <a href=' ' key={children.child_id} className="collection-item" 
                    id={children.child_id} onClick={this.child_btn_click}>
                        ID: {children.child_id}, Name: {children.name}</a>)}
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