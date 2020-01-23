import { Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import ForgotPassword from './pages/authentication/ForgotPassword';
import ResetPassword from './pages/authentication/ResetPassword';
import Home from './pages/home/index';
import AuthLayout from './pages/Layout/authenticationlayout';

const routes = [
    { path: '/login', component: Login, parentLayout: AuthLayout, route: Route },
    { path: '/register', component: Register, parentLayout: AuthLayout, route: Route },
    { path: '/forgotpassword', component: ForgotPassword, parentLayout: AuthLayout, route: Route },
    { path: '/resetpassword/:token', component: ResetPassword, parentLayout: AuthLayout, route: Route },
    { path: '/', component: Home, route: PrivateRoute }
];

export default routes;
