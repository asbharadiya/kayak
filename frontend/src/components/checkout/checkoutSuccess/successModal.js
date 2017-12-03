import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './successModal.css';
import { Modal } from 'react-bootstrap';
import * as actions from '../../../actions/booking';

class SuccessModal extends Component {

   constructor(props){
        super(props);
        this.state = {
          show: false ,
          showError : false
        }
    }



    closeErrorModal() {
      this.setState({
        showError: false ,
      })
    }


    componentWillReceiveProps(props){
      if(props.bookingSuccess === true ) {
        this.setState({
          show:true
        });

        this.props.resetSuccessBookingFlag() ;
      }

      if(props.bookingSuccess === false ) {
        this.setState({
          showError:true
        });

        this.props.resetSuccessBookingFlag() ;
      }


    }


    closeSuccessAndRedirect(){
      this.props.history.push('/user/bookings');
      this.setState({ show : false})
    }

    closeSuccessAndRedirectHome(){
      this.props.history.push('/');
      this.setState({ show : false})
    }

    render() {
        return (
          <div>
            <Modal show={this.state.show} className="successModal" id="successMoal">
              <div>
                <Modal.Body>
                  <div className="form-body">
                    <div className="form-group">
                      <div className="success-congrats"> Congratulations! </div>
                      <div className="booking-successfull"> <i className="fa fa-check-circle"> </i> Your booking was successful </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="div-success-footer">
                   <div className=" col-xs-6">
                        <a> <button className="btn btn-primary btn-kayak" onClick={this.closeSuccessAndRedirect.bind(this)}>My Bookings</button> </a>
                    </div>
                    <div className=" col-xs-6">
                        <a> <button className="btn btn-primary btn-kayak" onClick={this.closeSuccessAndRedirectHome.bind(this)}>Home</button> </a>
                    </div>
                  </div>
                </Modal.Footer>
              </div>
            </Modal>

            <Modal show={this.state.showError} className="successModal" id="successMoal">
              <div>
                <Modal.Header className="success-header">
                  <div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-body">
                    <div className="form-group">
                      <div className="success-congrats"> Error! </div>
                      <div className="booking-successfull"> <i className="fa fa-check-circle orange"> </i> Please try again after sometime </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="row">

                    <a> <button className="btn btn-primary btn-kayak" onClick={this.closeErrorModal.bind(this)}>Close</button> </a>
                  </div>
                </Modal.Footer>
              </div>
            </Modal>


          </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        bookingSuccess : state.listingsReducer.bookingSuccess
    };
}



function mapDispatchToProps(dispatch) {
    return {
        resetSuccessBookingFlag : () => dispatch(actions.resetSuccessBookingFlag())
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <SuccessModal {...props}/>));
