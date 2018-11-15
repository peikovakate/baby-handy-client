import React, {Component} from "react"
import { connect } from 'react-redux';
import { userActions } from '../_actions';
// TODO: add valid date picker

class AddChild extends Component{

    constructor(props) {
        super(props);

        this.state = {
            child: {
                name: '',
                birthday: '',
            },
            submitted: false,
            ///errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { child } = this.state;
        this.setState({
            child: {
                ...child,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // if (this.validateForm()) {

        this.setState({ submitted: true });
        const { child } = this.state;
        const { dispatch } = this.props;
        // TODO: add other properties to check before submiting
        if (child.name && child.birthday) {
            dispatch(userActions.register_child(child));
        }
    //}
}

    render(){
        const { register } = this.props;
        const { child, submitted } = this.state;
        return(
             <div className='container'>
                 <form onSubmit = {this.handleSubmit} >
                    <h5>Register a child</h5>
                    <div className ="input-field">
                        <label  htmlFor="firstName">Name</label>
                        <input type="text" name="name" onChange={this.handleChange}  value={this.state.child.name}/>
                    </div>
                    
                    <div className="input-field">
                        <label  htmlFor="firstName">Birth date</label>
                        <input type="text"  name="birthday" className="datepicker" onChange={this.handleChange}   value={this.state.child.birthday} />
                    </div>


                    <div className="input-field">
                        <button className="btn waves-effect waves-light" >Add child</button>
                        {register}
                    </div>
                 </form>


             </div>
             
        )
    }
}

function mapStateToProps(state) {
    const { register } = state.registration;
   return {
        register
    };
}

const connectedAddChild = connect(mapStateToProps)(AddChild);
export { connectedAddChild as AddChild };
