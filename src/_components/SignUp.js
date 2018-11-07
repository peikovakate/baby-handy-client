import React, {Component} from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class SignUp extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                lang: 'est',
                username: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        // TODO: add other properties to check before submiting
        if (user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }



    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state )
    //     axios.post(`${api.api}/parent/`, this.state)
    //     .then(res => {
    //         console.log(res);
    //         alert(res.data.message)
    //         this.props.history.push('/signin')
    //     }).catch(reason =>{
    //         alert(reason)
    //         console.log(`Got an error: ${reason}`)
    //     })
    // }

    render(){
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Sign Up</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="email" name="email" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='username'>Username</label>
                        <input type="text" name="username" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='lastName'>Last Name</label>
                        <input type="text" name="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >SignUp</button>
                    </div>
                 </form>
             </div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedSignUp = connect(mapStateToProps)(SignUp);
export { connectedSignUp as SignUp };
