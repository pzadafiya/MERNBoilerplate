import { combineReducers } from 'redux';
import account from './account/reducer';
import alert from './alert/reducer';

const rootReducer = combineReducers({
    account,
    alert,
});

export default rootReducer;