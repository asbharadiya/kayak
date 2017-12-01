import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import './header.css';
import * as actions from '../../actions/auth';
import AuthModal from '../authModal/authModal';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAuthModal:false
        }
        this.handleLink = this.handleLink.bind(this);
        this.openAuthModal = this.openAuthModal.bind(this);
        this.closeAuthModal = this.closeAuthModal.bind(this);
    }

    handleLink(path) {
        this.props.history.push(path);
    }

    openAuthModal(){
        this.setState({
            showAuthModal:true
        })
    }

    closeAuthModal(){
        this.setState({
            showAuthModal:false
        })
    }

    render() {
        return (
			<header className={(this.props.location.pathname === "/hotels"
                || this.props.location.pathname === "/flights"
                || this.props.location.pathname === "/cars") ? "":"solid"}>
				<div className="header-wrapper">
					<div className="logo-container">
						<NavLink to="/">
							<img src="/assets/images/kayak-logo.png" alt="logo"/>
						</NavLink>
					</div>
					<div className="nav-container">
						<ul className="nav">
							<li className="nav-item">
								<NavLink to="/hotels">
									Hotels
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/flights">
									Flights
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/cars">
									Cars
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="menu-container">
                        {
                            this.props.isLogged ? (
								<Nav>
									<NavDropdown eventKey={1} title={
										<div className="pull-left">
											<i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
											<span>My Account</span>
										</div>
                                    } id="user-dropdown">
										<MenuItem eventKey={1.1} onClick={()=>this.handleLink("/user/profile")}>Profile</MenuItem>
										<MenuItem eventKey={1.2} onClick={()=>this.handleLink("/user/bookings")}>History</MenuItem>
										<MenuItem eventKey={1.3} onClick={()=>this.props.logout()}>Logout</MenuItem>
									</NavDropdown>
								</Nav>
                            ) : (
								<a onClick={this.openAuthModal}>
									<i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
									<span>My Account</span>
								</a>
                            )
                        }
					</div>
				</div>
				<AuthModal showAuthModal={this.state.showAuthModal} closeAuthModal={this.closeAuthModal}></AuthModal>
			</header>
        );
    }
}


function mapStateToProps(state) {
    return {isLogged:state.authReducer.isLogged};
}

function mapDispatchToProps(dispatch) {
    return {
        checkSession : () => dispatch(actions.checkSession()),
        logout : () => dispatch(actions.logout())
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Header {...props}/>));
