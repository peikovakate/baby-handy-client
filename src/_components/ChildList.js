import React, {Component} from "react"
import { connect } from 'react-redux';  
import ChatBot from './ChatbotComponent'
        
class ChildList extends Component {
    state = {
        children: [
            {child_id:1, name: 'a1'},
            {child_id:2, name: 'b2'},
            {child_id:3, name: 'c3'},
        ],
        active_child_id: null
    }

    componentDidMount(){
    
    }
    
    render(){
        return(
            <div>
                <ul>
                    {this.state.children.map(children=><li>ID: {children.child_id}, Name: {children.name}</li>) }
                </ul>
                <ChatBot/>
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