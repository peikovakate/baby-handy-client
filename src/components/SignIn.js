import React, {Component} from "react"
import api from '../api';
import axios from 'axios'

class SignIn extends Component{
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://127.0.0.1:8000/login', this.state)
        .then(res => {
            console.log(res);
        })

    }

    render(){
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Sign In</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >Login</button>
                    </div>
                 </form>
             </div>
        )
    }
}

export default SignIn
