import React, {Component} from "react"
import ChatBot from './ChatbotComponent'
        
class ChildList extends Component {
    state = {
        children: []
    }

    componentDidMount(){
    
    }
    
    render(){
        return(
            <div>
                <ul>
                    {this.state.children.map(children=><li>{children.name}</li>) }
                </ul>
                <ChatBot/>
            </div>

        )
    }

}

export default ChildList
