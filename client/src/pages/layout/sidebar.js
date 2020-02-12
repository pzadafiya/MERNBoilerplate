import MetisMenu from 'metismenujs';
import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toggleSidebar } from '../../store/actions';

//this is the function which manage all side bar items, you can add pages in this function.
const SideNav = () => {
    return <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
            <li>
                <Link to="/home">
                    <i className="fa fa-home"></i>
                    <span> Home </span>
                </Link>
            </li>
            <li>
                <Link to="/account" aria-expanded="false">
                    <i className="fa fa-user"></i>
                    <span> Account </span>
                    <span className="menu-arrow"></span>
                </Link>
                <ul className="nav-second-level" >
                    <li><Link to="/userprofile">User Profile</Link></li>
                    <li><Link to="/changepassword">Change Password</Link></li>
                </ul>
            </li>
        </ul>
    </div>
};

class Sidebar extends Component {
    objMetisMenu = null;
    componentDidUpdate() {

        // For stop and destroy metisMenu.
        if (this.objMetisMenu)
            this.objMetisMenu.dispose(); //in case isToggle update , dispose metismenu and re-render

        this.initiateMetisMenu();
    }

    componentDidMount() {
        this.initiateMetisMenu();
    }

    // This is the function that run on sidebar component mount and when any changes updated in this component.
    initiateMetisMenu = () => {

        // Re-init metisMenu.
        this.objMetisMenu = new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        this.removeActiveMenu(ul); //remove existing selected menu

        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentMenu(matchingMenuItem);
        }
    }

    // This is the function that run when user click on side bar item
    activateParentMenu = (item) => {
        item.classList.add('active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('mm-active'); // li 
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add('mm-active'); // li
                    parent3.childNodes[0].classList.add('active'); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add('mm-active');
                    }
                }
            }
            return false;
        }
        return false;
    }

    // This is the function that run from the initiateMetisMenu function.
    removeActiveMenu = (ul) => {
        let items = ul.getElementsByClassName("active");
        for (var i = 0; i < items.length; ++i) {
            let item = items[i];
            item.classList.remove('active');

            const parent = item.parentElement;
            if (parent) {
                parent.classList.remove('mm-active'); // li 
                const parent2 = parent.parentElement;

                if (parent2) {
                    parent2.classList.remove("mm-show");

                    const parent3 = parent2.parentElement;

                    if (parent3) {
                        parent3.classList.remove('mm-active'); // li
                        parent3.childNodes[0].classList.add('mm-active'); //a
                        const parent4 = parent3.parentElement;
                        if (parent4) {
                            parent4.classList.remove('mm-active');
                        }
                    }
                }
                return false;
            }
        }
    }

    render() {
        return (
            <div className="left-side-menu">
                {this.props.isToggle ?
                    <PerfectScrollbar className="slimscroll-menu">
                        <SideNav />
                    </PerfectScrollbar>
                    :
                    <SideNav />
                }
                <div className="clearfix"></div>

            </div>
        )
    }
}

/* Redux mapping */
const mapState = state => {
    const { isToggle } = state.sidebar;
    return { isToggle };
}

export default withRouter(connect(mapState, { toggleSidebar })(Sidebar))
