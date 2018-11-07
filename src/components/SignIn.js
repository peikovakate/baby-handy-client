import React, {Component} from "react"
import api from '../api';
import axios from 'axios'

class SignIn extends Component{
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
      
          fields["email"] = "";

          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    console.log(this.state)
        axios.post(`${api.api}/login/`, this.state)
        .then(res => {
            console.log(res);
            alert(res.data.message)
            this.props.history.push('/ChildList')
        }).catch(reason =>{
            alert(reason)
            console.log(`Got an error: ${reason}`)
})

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;


      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email.";
        }
      }

      

      if (!fields["password"]) {
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

           <form method="post" name="LogIn" onSubmit= {this.submituserRegistrationForm} >
                    <h5>Sign In</h5>
                    <div className ="input-field">
                        <label  htmlFor='email'>Email</label>
                        <input type="text"  name="email" value={this.state.fields.email} onChange={this.handleChange}/>

                         </div>
                         <div className="errorMsg">{this.state.errors.email}</div>
                    <div className ="input-field">
                        <label  htmlFor='password'>Password</label>
                        <input type="password"  name="password" value={this.state.fields.password}  onChange={this.handleChange}/>

                    </div>
                        <div className="errorMsg">{this.state.errors.password}</div>
                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >Login</button>
                    </div>
                 </form>
             </div>
        );
    }
}

export default SignIn
