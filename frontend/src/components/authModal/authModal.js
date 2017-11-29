import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './authModal.css';
import * as api from '../../api/auth';
import * as actions from '../../actions/auth';

class AuthModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeForm:"signin",
            emailError:"",
            passwordError:"",
            firstNameError:"",
            lastNameError:"",
            formError:""
        }
        this.toggleActiveForm = this.toggleActiveForm.bind(this);
        this.handleSigninSubmit = this.handleSigninSubmit.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            activeForm:"signin",
            emailError:"",
            passwordError:"",
            firstNameError:"",
            lastNameError:"",
            formError:""
        });
    }

    toggleActiveForm(to){
        this.setState({
            activeForm:to,
            emailError:"",
            passwordError:"",
            firstNameError:"",
            lastNameError:"",
            formError:""
        })
    }

    handleSigninSubmit() {
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
                        this.props.closeAuthModal();
                        this.props.checkSession();
                    } else if (res.status === 401) {
                        this.setState({formError:"Invalid email or password"});
                    } else {
                        this.setState({formError:"Opps! Please try again"});
                    }
                });
        }
    };

    handleSignupSubmit() {
        this.setState({
            emailError:"",
            passwordError:"",
            firstNameError:"",
            lastNameError:"",
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
        if(this.firstName.value === ''){
            this.setState({firstNameError:"Please enter your first name"});
            isFormValid = false;
        }
        if(this.lastName.value === ''){
            this.setState({lastNameError:"Please enter your last name"});
            isFormValid = false;
        }
        if(isFormValid) {
            api.signup({email:this.email.value,password:this.password.value,firstName:this.firstName.value,lastName:this.lastName.value})
                .then((res) => {
                    if (res.status === 200) {
                        this.props.closeAuthModal();
                        this.props.checkSession();
                    } else if (res.status === 409) {
                        this.setState({formError:"User already exists"});
                    } else {
                        this.setState({formError:"Opps! Please try again"});
                    }
                });
        }
    };

    render() {
        return (
            <Modal show={this.props.showAuthModal} onHide={this.props.closeAuthModal} id="authModal">
                {
                    this.state.activeForm === 'signin' ? (
                        <div>
                            <Modal.Body>
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
                                        <button className="btn btn-primary btn-kayak" onClick={this.handleSigninSubmit}>Sign in</button>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <span>Don't have an account?</span>
                                <button className="btn btn-primary btn-kayak" onClick={()=>this.toggleActiveForm('signup')}>Sign up</button>
                            </Modal.Footer>
                        </div>
                    ) : (
                        <div>
                            <Modal.Body>
                                <div className="form-body">
                                    <div className="form-group">
                                        <span className="error">{this.state.firstNameError}</span>
                                        <input type="text" className="form-control" placeholder="First Name" ref={(firstName) => this.firstName = firstName}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="error">{this.state.lastNameError}</span>
                                        <input type="text" className="form-control" placeholder="Last Name" ref={(lastName) => this.lastName = lastName}/>
                                    </div>
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
                                        <button className="btn btn-primary btn-kayak" onClick={this.handleSignupSubmit}>Sign up</button>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <span>Already have an account?</span>
                                <button className="btn btn-primary btn-kayak" onClick={()=>this.toggleActiveForm('signin')}>Sign in</button>
                            </Modal.Footer>
                        </div>
                    )
                }
            </Modal>
        );
    }
}


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        checkSession : () => dispatch(actions.checkSession())
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <AuthModal {...props}/>));
