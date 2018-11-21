import { userConstants, chatbotConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    register_child,
    start_conversation
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/childlist');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/signin');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function register_child(child) {

    return dispatch => {
        dispatch(request(child));
        
        userService.register_child(child)
            .then(
                add_child_response => { 
                    let new_child = add_child_response.message
                    dispatch(success(new_child));
                    history.push('/childlist');
                    dispatch(alertActions.success('You successfully added a child.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(child) { return { type: userConstants.REGISTERCHILD_REQUEST, child } }
    function success(child) { return { type: userConstants.REGISTERCHILD_SUCCESS, child } }
    function failure(error) { return { type: userConstants.REGISTERCHILD_FAILURE, error } }
}

function start_conversation(child_data){
    return dispatch =>
     userService.results(child_data).then(
        results_response =>{
            console.log('Res resp', results_response.message)
            const message_array = results_response.message;
            for (var mes in message_array){
                dispatch(success(message_array[mes]))
            }
        },                
        error => {
            console.log('error', error)
            
            // dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }

    )
    function success(message) { return { type: chatbotConstants.RECEIVED_MESSAGE, message } }
}
