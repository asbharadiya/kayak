import React, { Component } from 'react';
import './hotelFilters.css';
import { withRouter } from 'react-router-dom';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {connect} from 'react-redux';
import * as hotelActions from '../../../../actions/hotel';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

class HotelFilters extends Component {


  constructor(props) {
      super(props);
      this.state = {
          rating:0,
          review_score: { 'min':0, 'max':5 },
          price: {'min' :0, 'max' : 2000}
      };
      this.updateStarFilter = this.updateStarFilter.bind(this);
      this.updateReviewScore = this.updateReviewScore.bind(this);
      this.updatePrice = this.updatePrice.bind(this);
  }

  updateReviewScore(value) {
    var min = value[0];
    var max = value[1];
    this.setState({
        review_score : { 'min' : min, 'max' : max }
    }, function(){
        //this.props.getAllHotels(this.state);
    });
  }

  updatePrice(value) {
    var min = value[0];
    var max = value[1];
    this.setState({
        price : { 'min' : min, 'max' : max }
    }, function(){
        this.props.applyFilters(this.state);
    });
  }

  updateStarFilter(starObject) {
    if(starObject.type === 'click') {
      this.setState({
          rating: starObject.rating
      }, function(){
          //this.props.getAllHotels(this.state);
      });
    }
  }

  render() {
    return (
      <div className="groups-content">
          <div className="groups-section">
              <div className="groups-title">
                  Stars
              </div>
              <div className="groups-list">
                  <ul>
                      <li className="text-center">
                        <Rater total={5} interactive={true} rating={this.state.rating} onRate={this.updateStarFilter.bind(this)}/>
                      </li>
                  </ul>
              </div>
          </div>
          <div className="groups-section">
              <div className="groups-title">
                  Review Score
              </div>
              <div className="groups-list">
                  <ul>
                      <li className="text-center">
                        <div className="move_bottom_20">
                          <div className="pull-left"> {this.state.review_score['min']}</div>
                          <div className="text-right"> {this.state.review_score['max']}</div>
                        </div>
                        <div>
                          <Range min={0} max={5} step={1} defaultValue={[0, 5]} onChange={this.updateReviewScore} />
                        </div>
                      </li>
                  </ul>
              </div>
          </div>
          <div className="groups-section">
              <div className="groups-title">
                  Room Type
              </div>
              <div className="groups-list">
                <CheckboxGroup
                    name="luggage"
                    value={this.state.luggage}
                    onChange={this.luggageChanged} className="CheckboxGroup">
                  <ul>
                      <li>
                        <label className="labelCheckBox"><Checkbox value="Conference"/> Conference </label>
                      </li>
                      <li>
                        <label className="labelCheckBox"><Checkbox value="Premium"/> Premium </label>
                      </li>
                      <li>
                        <label className="labelCheckBox"><Checkbox value="Honeymoon Suite"/> Honeymoon Suite </label>
                      </li>
                      <li>
                        <label className="labelCheckBox"><Checkbox value="Standard"/> Standard </label>
                      </li>
                  </ul>
                </CheckboxGroup>
              </div>
          </div>
          <div className="groups-section">
              <div className="groups-title">
                  Price
              </div>
              <div className="groups-list">
                  <ul>
                      <li className="text-center">
                        <div className="move_bottom_20">
                          <div className="pull-left"> ${this.state.price['min']}</div>
                          <div className="text-right"> ${this.state.price['max']}</div>
                        </div>
                        <div>
                          <Range min={0} max={2000} step={1} defaultValue={[0, 2000]} onChange={this.updatePrice} />
                        </div>
                      </li>
                  </ul>
              </div>
          </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllHotels : (state) => dispatch(hotelActions.getAllHotels(state))
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <HotelFilters {...props}/>));
