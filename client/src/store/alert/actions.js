import { SHOW_NOTIFICATION, REMOVE_NOTIFICATION } from './constants';

export const alertActions = {
	showNotification,
	removeNotification
};

function showNotification(message_type, message, hideDuration) {
	return {
		type: SHOW_NOTIFICATION,
		payload: { message_type, message, hideDuration }
	};
}

function removeNotification() {
	return {
		type: REMOVE_NOTIFICATION
	};
}
