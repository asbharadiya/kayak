import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import {connect} from 'react-redux';
import './header.css';
import './header.responsive.css';
import * as actions from '../../../actions/auth';

class Header extends Component {

	constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink(path) {
    this.props.history.push(path);
  }

	render() {
    return (
    		<header>
    			<div className="page-title-container">
    				<h1>

            </h1>
    			</div>
    			<div className="topnav-container">
      			<Nav>
			        <NavDropdown eventKey={1} title={
                  <div className="pull-left">
                    {this.props.username}
                  </div>
                } 
                id="user-dropdown">
				        <MenuItem eventKey={1.1}>Account Settings</MenuItem>
				        <MenuItem eventKey={1.2} onClick={()=>this.props.logout()}>Logout</MenuItem>
			        </NavDropdown>
			    </Nav>
    			</div>
    		</header>
  	);
	}
}

function mapStateToProps(state) {
    return {username:state.authReducer.username};
}

function mapDispatchToProps(dispatch) {
    return {
        logout : () => dispatch(actions.logout())
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Header {...props}/>));
