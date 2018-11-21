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
      console.log('Register child success')
      let new_state = state
      new_state.user.children.push(action.child)
      // storing updated user in local storage. Might be not right, however private routing
      localStorage.setItem('user', JSON.stringify(new_state.user))
      return new_state
    case userConstants.REGISTERCHILD_FAILURE:
      return state;


    case userConstants.DELETE_REQUEST:
    return state
   case userConstants.DELETE_SUCCESS:
  
   return state
   //{...state,user:{
           //...state.user,children:{
   // ...state.user.children,[action.child_id]:[state.user.children.filter(child => child.child_id !== action.child_id)]
  //}}
  // };
     
 // localStorage.removeItem('user', JSON.stringify(state_new.user))
   // return state_new
      //console.log('Deleted child success')
      //return state
     // const childId= action.data;
     // let state_new=state;
      //let user=state_new.user;
      //let children=user.children;

    case userConstants.DELETE_FAILURE:
      return state;
    default:
      return state


  }
}