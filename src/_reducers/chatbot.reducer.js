import { chatbotConstants } from '../_constants';

export function chatbot(state = {}, action) {
  switch (action.type) {
    case chatbotConstants.RECEIVED_MESSAGE:
      return {
        message: action.message
      };
    default:
      return state
  }
}