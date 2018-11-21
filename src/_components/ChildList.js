import React, { Component } from "react"
import { connect } from 'react-redux';
import ChatBot from './ChatbotComponent'

class ChildList extends Component {
    constructor(props){
        super(props);
    }
    state = {
        active_child_id: null
    }

    child_btn_click(e) {
        e.preventDefault();
        this.chatbot.toggleChat()
    }

    render() {
        return (
            <div >
                <ul className="collection">
                    {this.props['user'].user.children.map(children => 
                    <a href=' ' key={children.child_id} className="collection-item" 
                    id={children.child_id} onClick={this.child_btn_click.bind(this)}>
                        ID: {children.child_id}, Name: {children.name}</a>)}
                </ul>
                <ChatBot ref={c => (this.chatbot = c)} />
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