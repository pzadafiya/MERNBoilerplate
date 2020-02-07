import {IS_SIDEBAR_TOGGLE } from './constants';

const initialState={
    isToggle : true
}

//This sidebarToggle reducer function is used for handle action and return state.
const sidebarToggle = (state=initialState,action) => {
    switch(action.type){
        
        case IS_SIDEBAR_TOGGLE:
            state = {
                ...state,
                isToggle : action.payload
            }
            break;
        default:
            state = {...state};
            break;
    }
    return state;
} 

export default sidebarToggle;