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
            submitted: false,
            errors:{}
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
      if (this.validateForm()) {
        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
}

   validateForm() {

      let email = this.state.email;
      let password=this.state.password;
      let errors = {};
      let formIsValid = true;


      if (!email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
      }

      if (typeof email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email.";
        }
      }

      

      if (!password) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

 

      this.setState({
        errors: errors
      });
      return formIsValid;


    }

    render(){
        return(
             <div className='container'>

           <form  name="LogIn" onSubmit= {this.handleSubmit} >
                    <h5>Sign In</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="text"  name="email" value={this.state.email} onChange={this.handleChange}/>

                         </div>
                         <div className="errorMsg">{this.state.errors.email}</div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password"  name="password" value={this.state.password}  onChange={this.handleChange}/>

                    </div>
                        <div className="errorMsg">{this.state.errors.password}</div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >Login</button>
                    </div>
                        <Link to="/register" className="btn btn-link">Register</Link>
                 </form>
             </div>
        );
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

