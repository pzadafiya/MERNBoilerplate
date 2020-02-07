import { Component } from 'react';
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

// Call it once in your app. At the root of your app is the best place
toast.configure();

class Notifications extends Component {
    componentDidMount() {
        // call this function to display notification
        this.renderToast();
    }

    componentDidUpdate() {
        // call this function to display notification
        this.renderToast();
    }

    // This is the function to get Tost Transition like bounce, zoom or slide. 
    getToastTransition = () => {
        // you can pass transType value via props like message_type, message or hideDuration
        var transType = "bounce";
        switch (transType.toLowerCase()) {
            case 'bounce':
                return Bounce;
            case 'zoom':
                return Zoom;
            case 'slide':
                return Slide;
            case 'flip':
                return Flip;
            default:
                return Bounce;
        }
    }

    //This is the function to get Toast Type  like success, error or info from message_type props.
    getToastType = () => {
        var toastType = this.props.message_type;
        switch (toastType.toLowerCase()) {
            case 'success':
                return toast.TYPE.SUCCESS;
            case 'error':
                return toast.TYPE.ERROR;
            case 'info':
                return toast.TYPE.INFO;
            case 'warning':
                return toast.TYPE.WARNING;
            default:
                return toast.TYPE.SUCCESS;
        }
    }

    //This is the function that runs when Notification Component load.
    renderToast = () => {
        var message = this.props.message;

        //if you want to add close button then set below property as true. 
        var isAddCloseBtn = false;
        var isAutoClose = true;
        var isProgressBarhide = false;
        var isnewestOnTop = false;
        //you can set time duration by changing below value.
        var showDuration = this.props.hideDuration || 3000;

        var toastOptions = {
            position: "top-center",
            transition: this.getToastTransition(),
            progressClassName: "toast-progress",
            hideProgressBar: isProgressBarhide,
            type: this.getToastType(),
            closeButton: isAddCloseBtn,
            autoClose: isAutoClose && !isNaN(showDuration) ? parseInt(showDuration) : false,
            newestOnTop: isnewestOnTop
        };

        toast(message, toastOptions);
    }

    render() {
        return (
            null
        )
    }
}

// define your prop validations
Notifications.propTypes = {
    message_type: PropTypes.string,
    message: PropTypes.string,
    hideDuration: PropTypes.number
};

export default Notifications;