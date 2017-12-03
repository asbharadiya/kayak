import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './paymentMethodComponents.css';
import { Modal } from 'react-bootstrap';
import * as profiles from '../../../../api/profile.js' ;
import * as analytics from '../../../../actions/analytics';


class PaymentMethodsComponents extends Component {

    constructor(props){
        super(props) ;

        this.state = {
           openCardDeleteModal : false
        }
    }


  trackClick(click, page) {
    var payload = {'click' : click, 'page' : page};
    this.props.trackClick(payload);
  }

   deleteCard(){
       var _this = this ;
       profiles.deleteCreditCard(this.props.card._id , function(err , response){
            if(!err){
                response.then(res => {
                    if(res.status === 200){
                        _this.props.getCreditCardsForUser();
                        _this.setState({ openCardDeleteModal : false})
                    }
                })
            }
        })
   }

   openDeleteCardModal(){
    this.setState({openCardDeleteModal : true  })
   }

    closeDeleteCardModal(){
        this.setState({openCardDeleteModal : false  })
    }



    render() {



        return (
            <div className="row credit-card-div">
                <div className="col-xs-11">
                    <span>#{this.props.number}</span>
                    <label>{this.props.card.cardNumber}</label>
                </div>
                <div className="pull-right">
                    <a onClick={this.openDeleteCardModal.bind(this)}><i className="fa fa-minus-circle fa-lg" aria-hidden="true"></i></a>
                </div>

                <Modal show={this.state.openCardDeleteModal}   id="carModal" className="booking-detail-modal">

                    <Modal.Body>
                        <div className="delete-card-confirm">
                            <h3>Are you sure to delete the Card ? </h3>
                        </div>

                        <div className="row delete-card-footer">
                            <div className="col-xs-4 col-xs-offset-2">
                                 <button onClick={this.closeDeleteCardModal.bind(this)} className="btn btn-default card-delete-cancel">Close</button>
                            </div>
                            <div className="col-xs-4 ">
                                <button onClick={this.deleteCard.bind(this)} className="btn btn-default btn-kayak">Confirm</button>
                            </div>
                        </div>

                    </Modal.Body>





                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        trackClick : (payload) => dispatch(analytics.trackClick(payload))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <PaymentMethodsComponents {...props}/>));
