import React, {Component} from "react"

class AddChild extends Component{

    state = {
        name: '',
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state )
    }

    render(){
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Rigister a child</h5>
                    <div className ="input-field">
                        <label  htmlFor="firstName">Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" className="datepicker"/>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >SignUp</button>
                    </div>
                 </form>
             </div>
        )
    }
}

export default AddChild
