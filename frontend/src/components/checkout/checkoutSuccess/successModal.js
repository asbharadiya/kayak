import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './successModal.css';
import { Modal } from 'react-bootstrap';
import * as actions from '../../../actions/booking';

class SuccessModal extends Component {


   closeModal() {
      this.setState({
        show: false
      })
    }

    constructor(props){
        super(props);
        this.state = {
          show: false
        }
    }

    componentWillReceiveProps(props){
      if(props.bookingSuccess) {
        this.setState({
          show:true
        }, function() {

        });
      }
    }

    render() {
        return (
          <Modal show={this.state.show} className="successModal" id="successMoal">
            <div>
              <Modal.Header className="success-header">
                <div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="form-body">
                  <div className="form-group">
                    <div className="success-congrats"> Congratulations! </div>
                    <div className="booking-successfull"> <i className="fa fa-check-circle orange"> </i> Your booking was successful </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                  <a href="/user/bookings"> <button className="btn btn-primary btn-kayak">My Bookings</button> </a>
                  <button className="btn btn-primary btn-kayak" onClick={()=>this.closeModal()}>Close</button>
              </Modal.Footer>
            </div>
          </Modal>
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
