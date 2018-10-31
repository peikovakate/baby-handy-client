import React, {Component} from "react"
import axios from 'axios'
import api from '../api'

class ChildList extends Component {
    state = {
        children: []
    }

    componentDidMount(){
        axios.get(`{api.api}/`)
        .then(res => {
            console.log(res);
            this.setState({children: res.data})
        })
    }
    
    render(){
        return(
            <ul>
                {this.state.children.map(children=><li>{children.name}</li>) }
            </ul>
        )
    }


}

export default ChildList
