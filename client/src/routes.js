import { Route } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import changePassword from './pages/account/changePassword';
import userProfile from './pages/account/userProfile';
import forgotPassword from './pages/authentication/forgotPassword';
import login from './pages/authentication/login';
import register from './pages/authentication/register';
import resetPassword from './pages/authentication/resetPassword';
import verifyAccount from './pages/authentication/verifyAccount';
import home from './pages/home/index';
import authLayout from './pages/layout/authenticationLayout';

const routes = [
    //Authentication Pages
    { path: '/login', component: login, parentLayout: authLayout, route: Route },
    { path: '/register', component: register, parentLayout: authLayout, route: Route },
    { path: '/forgotpassword', component: forgotPassword, parentLayout: authLayout, route: Route },
    { path: '/resetpassword/:token', component: resetPassword, parentLayout: authLayout, route: Route },
    { path: '/verifyaccount/:token', component: verifyAccount, parentLayout: authLayout, route: Route },

    //Account Pages
    { path: '/userprofile', component: userProfile, route: PrivateRoute },
    { path: '/changepassword', component: changePassword, route: PrivateRoute },

    //Home Page
    { path: '/home', component: home, route: PrivateRoute },
    { path: '/', component: home, route: PrivateRoute },
];

export default routes;
