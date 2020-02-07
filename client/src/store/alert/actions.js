import { REMOVE_NOTIFICATION, SHOW_NOTIFICATION } from './constants';

export const alertActions = {
	showNotification,
	removeNotification
};

// This is the function that runs when showNotification action call from saga
function showNotification(message_type, message, hideDuration) {
	return {
		type: SHOW_NOTIFICATION,
		payload: { message_type, message, hideDuration }
	};
}

// This is the function that runs when removeNotification action call from saga
function removeNotification() {
	return {
		type: REMOVE_NOTIFICATION
	};
}
