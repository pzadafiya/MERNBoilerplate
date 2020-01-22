import { SHOW_NOTIFICATION,REMOVE_NOTIFICATION } from './constants';

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