import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    register_child,
    deleteChild,
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

function deleteChild(child_id) {
    return dispatch => {
        dispatch(request(child_id));

        userService.delete(child_id)
            .then(
                message => dispatch(success(child_id)),
                error => dispatch(failure(child_id, error.toString()))
            );
    };

    function request(child_id) { return { type: userConstants.DELETE_REQUEST, child_id } }
    function success(child_id) { return { type: userConstants.DELETE_SUCCESS, child_id } }
    function failure(child_id,error) { return { type: userConstants.DELETE_FAILURE,child_id, error } }
}