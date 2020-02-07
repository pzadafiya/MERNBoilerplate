import { SHOW_NOTIFICATION,REMOVE_NOTIFICATION } from './constants';

//This alert reducer function is used for handle action and return state.
const alert = (state = {}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        messageInfo: action.payload
      }
      case REMOVE_NOTIFICATION:
      return {};
    default:
      return state
  }
}

export default alert;