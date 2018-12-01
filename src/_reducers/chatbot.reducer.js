import { chatbotConstants } from '../_constants';

export function chatbot(state = {}, action) {
  switch (action.type) {
    case chatbotConstants.RECEIVED_MESSAGE:
      console.log(action)
      return {
        message: action.response.message,
        test_id: action.response.test_id
      };
    default:
      return state
  }
}

export function chooseChildToTalkReducer(state = {}, action) {
  switch(action.type) {
    case chatbotConstants.CHILD_CHANGED:
    return {
      child_id: action.child_id,
    };
  default:
    return state
  }
}