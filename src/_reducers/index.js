import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { chatbot } from './chatbot.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  chatbot
});

export default rootReducer;