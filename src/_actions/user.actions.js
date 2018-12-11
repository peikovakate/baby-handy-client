import { userConstants, chatbotConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { dropMessages } from 'react-chat-widget';

export const userActions = {
    login,
    logout,
    register,
    register_child,
    start_conversation,
    deleteChild,
    next_message,
    change_child
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
    dropMessages()
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
    return dispatch => {
        dispatch(request(child_data));
        userService.results(child_data).then(
            results_response =>{
                // might be returned not a array, but one string 
                const messages = results_response.message;
                if (Array.isArray(messages)){
                    for (var mes in messages){
                        dispatch(success({message: messages[mes], test_id: results_response.test_id}))
                    }
                }else{
                    dispatch(success({message: messages, test_id: results_response.test_id})) 
                }
                
            },                
            error => {
                dispatch(alertActions.error(error.toString()));
            }

    )};

    function success(response) { return { type: chatbotConstants.RECEIVED_MESSAGE, response } }
    function request(child_data) { return { type: chatbotConstants.REQUEST_MESSAGE, child_data } }
}

function deleteChild(child_id) {
    return dispatch => {
        dispatch(request(child_id));

        userService.delete(child_id)
            .then(
                message => dispatch(success(child_id)),                    
                dispatch(alertActions.success('You successfully deleted a child.')),
                error => dispatch(failure(child_id, error.toString()))
            );
    };

    function request(child_id) { return { type: userConstants.DELETE_REQUEST, child_id } }
    function success(child_id) { return { type: userConstants.DELETE_SUCCESS, child_id } }
    function failure(child_id, error) { return { type: userConstants.DELETE_FAILURE, child_id, error } }
}

function next_message(message_data) {
    console.log('sending next message')
    return dispatch => {
        console.log('sending next message yo');
        userService.process_message(message_data).then(
            results_response => {
            // const message = results_response.message;
            dispatch(success({message: results_response.message,  test_id: results_response.test_id}))
            },                
            error => {
                dispatch(alertActions.error(error.toString()));
            }
    )};
    function success(response) { return { type: chatbotConstants.RECEIVED_MESSAGE, response } }
}

function change_child(child_id) {
    return { type: chatbotConstants.CHILD_CHANGED, child_id };
}
