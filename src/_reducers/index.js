import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { chatbot, chooseChildToTalkReducer } from './chatbot.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  chatbot,
  chooseChildToTalkReducer
});

export default rootReducer;