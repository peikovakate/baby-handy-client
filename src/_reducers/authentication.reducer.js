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
      console.log('Deleted child successfully')
      let children = state.user.children;
      //Need the index of array to be deleted to filter them
      const childtodeleteIndex = children.findIndex(x => x.child_id == action.child_id);

      let state_new = state
      state_new = {
        ...state_new, user: {
          ...state_new.user, children: [...state_new.user.children.filter(item => item != state_new.user.children[childtodeleteIndex])]
        }
      };
      localStorage.setItem('user', JSON.stringify(state_new.user))
      return state_new
    case userConstants.DELETE_FAILURE:
      return state;



    case userConstants.CODE_REQUEST:
      return state
    case userConstants.CODE_SUCCESS:
      console.log('Security code received successfully')
      let children1 = state.user.children;
      //Need the index of array to be deleted to filter them
      const childtogetcodeIndex = children1.findIndex(x => x.child_id == action.response1.child_id);
      console.log(childtogetcodeIndex);
      console.log(action.response1.message);
      let new_State = state
      console.log('aaa')
      console.log(new_State)
      //new_State = {
      // ...new_State, user: {
      // ...new_State.user, children: [ ...new_State.user.children:
      // {[childtogetcodeIndex]:{sec_code:action.response1.message }}]
      //}
      //}

      //let sec_code=new_State.user.children[childtogetcodeIndex].sec_code
      new_State.user.children[childtogetcodeIndex].sec_code = action.response1.message;
      console.log('bbb')
      console.log(new_State)
      // let state_New = state

      localStorage.setItem('user', JSON.stringify(new_State.user))
      return new_State;
    case userConstants.CODE_FAILURE:
      return state;

    // add child part
    case userConstants.REGISTER_COMMON_CHILD_REQUEST:
      return state
    case userConstants.REGISTER_COMMON_CHILD_SUCCESS:
      console.log('aaa')
      console.log(action.response2)
      // add to state array of children, firstname and id of child that can be received from action object 
      // action.child should return a child object with legal (correct) properties
      let New_state = state
      New_state.user.children.push(action.response2)
      // storing updated user in local storage. Might be not right, however private routing
      localStorage.setItem('user', JSON.stringify(New_state.user))
      console.log(New_state)
      return New_state
    case userConstants.REGISTER_COMMON_CHILD_FAILURE:
      return state;



    default:
      return state


  }
}