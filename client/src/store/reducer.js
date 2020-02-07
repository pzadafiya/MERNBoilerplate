import { combineReducers } from 'redux';
import account from './account/reducer';
import alert from './alert/reducer';
import sidebar from './sidebar/reducer';

const rootReducer = combineReducers({
    account,
    alert,
    sidebar
});

export default rootReducer;