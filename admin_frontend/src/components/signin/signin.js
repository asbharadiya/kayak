import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './signin.css';
import './signin.responsive.css';
import * as api from '../../api/auth';
import * as actions from '../../actions/auth';

class Signin extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  emailError:"",
			passwordError:"",
		  formError:""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		this.setState({
			emailError:"",
			passwordError:"",
			formError:""
		});
		let isFormValid = true;
		if(this.email.value === ''){
			this.setState({emailError:"Please enter your email"});
			isFormValid = false;
		} else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.value))){
			this.setState({emailError:"Please enter valid email"});
			isFormValid = false;
		}
		if(this.password.value === ''){
			this.setState({passwordError:"Please enter your password"});
			isFormValid = false;
		}
		if(isFormValid) {
			api.signin({email:this.email.value,password:this.password.value})
			.then((res) => {
				if (res.status === 200) {
					this.props.history.push("/home");
					this.props.checkSession();
				} else if (res.status === 401) {
				this.setState({formError:"Invalid email or password"});
				} else {
				this.setState({formError:"Opps! Please try again"});
				}
			})
		}
	}

	render() {
  		return (
			<div className="signin-page-wrapper">
				<div className="page-content">
				<div className="form-container">
				<div className="form-header">
				  <img src="/assets/images/kayak-logo.png" alt="logo" />
				</div>
						<div className="form-body">
							<div className="form-group">
								<span className="error">{this.state.emailError}</span>
								<input type="email" className="form-control" placeholder="Email" ref={(email) => this.email = email}/>
							</div>
							<div className="form-group">
						<span className="error">{this.state.passwordError}</span>
								<input type="password" className="form-control" placeholder="Password" ref={(password) => this.password = password}/>
							</div>
							<div className="form-group btn-container">
						<span className="error">{this.state.formError}</span>
								<button className="btn btn-primary btn-kayak" onClick={this.handleSubmit}>Sign in</button>
							</div>
						</div>
						</div>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
  return {
    checkSession : () => dispatch(actions.checkSession())
  };
}

export default withRouter(connect(null,mapDispatchToProps)(props => <Signin {...props}/>));
