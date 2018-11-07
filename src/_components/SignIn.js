import React, {Component} from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class SignIn extends Component{
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state)
    //     axios.post(`${api.api}/login/`, this.state)
    //     .then(res => {
    //         console.log(res);
    //         // alert(res.data.message)
    //         this.props.history.push('/ChildList')
    //     }).catch(reason =>{
    //         alert(reason)
    //         console.log(`Got an error: ${reason}`)
    //     })
    // }

    render(){
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Sign In</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="email" name="email" onChange={this.handleChange}/>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >Login</button>
                    </div>
                    <Link to="/register" className="btn btn-link">Register</Link>
                 </form>
             </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedSignInPage = connect(mapStateToProps)(SignIn);
export { connectedSignInPage as SignIn }; 

