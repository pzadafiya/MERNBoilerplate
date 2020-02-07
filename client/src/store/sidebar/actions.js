
import { IS_SIDEBAR_TOGGLE } from './constants';

// This is the function that runs when toggleSidebar action call, on click of toggle button by user.
export const toggleSidebar = (isToggle) => {
    return {
        type: IS_SIDEBAR_TOGGLE,
        payload: isToggle
    }
}

