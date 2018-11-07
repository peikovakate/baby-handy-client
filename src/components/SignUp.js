import React, {Component} from "react"
import axios from 'axios'
import api from '../api'

class SignUp extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["firstName"] = "";
          fields["email"] = "";
          fields["lastName"] = "";
          fields["password"] = "";
          fields["language"]= 'est',
          this.setState({fields:fields});
          alert("Form submitted");
      }
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

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["firstName"]) {
        formIsValid = false;
        errors["firstName"] = "*Please enter your name.";
      }
        if (!fields["lastName"]) {
        formIsValid = false;
        errors["lastName"] = "*Please enter your name.";
      }

      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{6,})(?=.*\d).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter a password longer than 6 characters and at least one digit.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }


    render(){
    const { errors } = this.state;

        return(
             <div className='container'>
          <form method="post" name="Register" onSubmit= {this.submituserRegistrationForm} >
                    <h5>Sign Up</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="text" name="email" onChange={this.handleChange} value={this.state.fields.email}/>
                     <div className="errorMsg">{this.state.errors.email}</div> 
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.fields.password}/>
                  <div className="errorMsg">{this.state.errors.password}</div>
                    </div>
                    <div className ="input-field">
                        <label  htmlFor='lastName'>Last Name</label>
                        <input type="text" name="lastName" onChange={this.handleChange} value={this.state.fields.lastName}/>
                        <div className="errorMsg">{this.state.errors.lastName}</div>
                     </div>
                    <div className ="input-field">
                        <label  htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" onChange={this.handleChange} value={this.state.fields.firstName}/>
                     <div className="errorMsg">{this.state.errors.firstName}</div>
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
export default SignUp
