import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import imgLogo from '../../assets/images/logo.png';
import { logout, toggleSidebar } from '../../store/actions';


class Topbar extends Component {

    // This is the function that run when user click on logout.
    Logout = () => {
        this.props.logout(this.props.history);
    }

    // This is the function that run when user click on toggle-menu button at the left top corner.
    leftSidebarToggle = () => {
        document.body.classList.toggle('sidebar-enable');
        if (window.innerWidth >= 768)
            document.body.classList.toggle('enlarged');
        else
            document.body.classList.remove('enlarged');

        this.props.toggleSidebar(!this.props.isToggle);
    }

    render() {
        return (
            <div className="navbar-custom">
                <ul className="list-unstyled topnav-menu float-right mb-0">
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret> <i className="fa fa-user" aria-hidden="true"></i>  {this.props.user.firstName} </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to='/userprofile' className='dropdown-item'>User Profile </DropdownItem>
                            <DropdownItem tag={Link} to='/changepassword' className='dropdown-item'>Change Password </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.Logout()}> Logout </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </ul>

                <div className="logo-box">
                    <Link to="/" className="logo text-center">
                        <span className="logo-lg">
                            <img src={imgLogo} alt="" height="22" />
                        </span>
                        <span className="logo-sm">
                            <img src={imgLogo} alt="" height="24" />
                        </span>
                    </Link>
                </div>

                <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                    <li>
                        <span className="pointer toggle-menu" onClick={this.leftSidebarToggle} >
                            <i className="fa fa-bars fa-5"></i>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

/* Redux mapping */
function mapState(state) {
    const { user } = state.account.authentication;
    const { isToggle } = state.sidebar;

    return { user, isToggle };
}

export default withRouter(connect(mapState, { toggleSidebar, logout })(Topbar));