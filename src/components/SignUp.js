import React, {Component} from "react"
import axios from 'axios'
import api from '../api'

class SignUp extends Component{
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        lang: 'est',
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state )
        axios.post(`${api.api}/parent/`, this.state)
        .then(res => {
            console.log(res);
            alert(res.data.message)
            this.props.history.push('/signin')
        }).catch(reason =>{
            alert(reason)
            console.log(`Got an error: ${reason}`)
        })
    }

    render(){
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Sign Up</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='username'>Username</label>
                        <input type="text" id="username" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='lastName'>Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >SignUp</button>
                    </div>
                 </form>
             </div>
        )
    }
}

export default SignUp
