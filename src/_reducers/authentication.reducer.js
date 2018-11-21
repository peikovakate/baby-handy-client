import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};

    // add child part
    case userConstants.REGISTERCHILD_REQUEST:
        return state
    case userConstants.REGISTERCHILD_SUCCESS:
        // add to state array of children, firstname and id of child that can be received from action object 
        // action.child should return a child object with legal (correct) properties
        let new_state =  state 
        new_state.user.children.push(action.child)
        // storing updated user in local storage. Might be not right, however private routing
        localStorage.setItem('user', JSON.stringify(new_state.user))
        return new_state
    case userConstants.REGISTERCHILD_FAILURE:
        return state;

    default:
      return state
  }
}