import React, { Component } from "react"
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';


class AddChild extends Component {

    constructor(props) {
        super(props);


        this.state = {
            child: {
                firstname: '',
                birthday: '',
            },
            submitted: false,
            errors: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
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

    handleDayChange(value) {
        const input = this.dayPickerInput.getInput();
        const { child } = this.state;
        if (typeof value === 'object') {
            const value1 = formatDate(value, 'DD/MM/YYYY');
            this.setState({
                child: {
                    ...child,
                    birthday: value1,
                }
            });
        }
        else
            if (typeof input.value === 'string' && input.value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                this.setState({
                    child: {
                        ...child,
                        birthday: input.value,
                    }
                });

            }


    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {

            this.setState({ submitted: true });
            const { child } = this.state;
            const { dispatch } = this.props;
            if (child.firstname && child.birthday) {
                child.parent_id = this.props['user'].user.id
                dispatch(userActions.register_child(child));
            }
        }
    }

    ///Form validation


    validateForm() {


        let firstName = this.state.child["firstname"];
        let birthday = this.state.child["birthday"];
        let errors = {};
        let formIsValid = true;

        //first name validation
        if (!firstName) {
            formIsValid = false;
            errors["firstName"] = "*Please enter your child first name.";
        }

        if (typeof firstName !== "undefined") {
            if (!firstName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["firstname"] = "*Please use only letters for your child first name and no spaces.";
            }
        }
        //birthday validation
        if (!birthday) {
            formIsValid = false;
            errors["birthday"] = "*Please select your child date of birth.";
        }

        if (typeof birthday !== "undefined") {
            if (!birthday.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                formIsValid = false;
                errors["birthday"] = "*Please enter the date in the format DD/MM/YYYY.";
            }
        }



        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    render() {
        const { register } = this.props;
        const { child, submitted } = this.state;
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} >
                    <h5>Register a child</h5>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="firstname" onChange={this.handleChange} value={this.state.child.firstname} />
                        <div className="errorMsg">{this.state.errors.firstname}</div>
                    </div>
                    {!child.birthday && <p>Choose a day</p>}
                    <div className='row'>
                        <div className="col s3">
                            <div className="YearNavigation">
                                <DayPickerInput
                                    name="birthday"
                                    keepFocus={true}
                                    ref={el => (this.dayPickerInput = el)}
                                    placeholder={`${formatDate(new Date(), 'DD/MM/YYYY')}`}
                                    dayPickerProps={{ disabledDays: { after: new Date() } }}
                                    formatDate={formatDate}
                                    onDayChange={this.handleDayChange}
                                    onChange={this.handleChange}
                                    value={this.state.child.birthday} />
                            </div>

                            <div className="errorMsg">{this.state.errors.birthday}</div>
                        </div>
                        <div className="col s2">
                            <div className="input-field">
                                <button className="btn waves-effect waves-light" >Add child</button>
                                {register}
                            </div>
                        </div>

                    </div>
                </form>


            </div>

        )
    }
}
function mapStateToProps(state) {
    const { authentication } = state;
    const user = authentication
    return {
        user
    };
}

const connectedAddChild = connect(mapStateToProps)(AddChild);
export { connectedAddChild as AddChild };
