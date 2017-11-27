import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './carFilters.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {connect} from 'react-redux';
import * as carActions from '../../../../actions/car';

class CarFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occupants: [] ,
            luggage : [] ,
            category : []
        };
        this.occupantsChanged = this.occupantsChanged.bind(this);
        this.luggageChanged = this.luggageChanged.bind(this);
        this.categoryChanged = this.categoryChanged.bind(this);
    }
    occupantsChanged = (newoccupants) => {
        this.setState({
            occupants: newoccupants
        }, function(){
            this.props.applyFilters(this.state);
        });
    }

    luggageChanged = (newLuggage) => {
        this.setState({
            luggage: newLuggage
        }, function () {
            this.props.applyFilters(this.state);
        });
    }

    categoryChanged = (newCategory) => {
        this.setState({
            category: newCategory
        }, function(){
            this.props.applyFilters(this.state);
        });
    }

    render() {
        return (
            <div className="groups-content">
                <div className="groups-section">
                    <div className="groups-title">
                        Price Range
                    </div>
                    <div className="groups-list">
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </div>
                </div>

                <div className="groups-section">
                    <div className="groups-title">
                        Luggage
                    </div>
                    <div className="groups-list">
                        <ul>
                            <li>
                                <CheckboxGroup
                                    name="luggage"
                                    value={this.state.luggage}
                                    onChange={this.luggageChanged} className="CheckboxGroup">

                                    <label className="labelCheckBox"><Checkbox value="YES"/> YES </label>
                                    <label className="labelCheckBox"><Checkbox value="NO"/> NO </label>
                                </CheckboxGroup>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="groups-section">
                    <div className="groups-title">
                        Capacity
                    </div>
                    <div className="groups-list">
                        <ul>
                            <li>
                                <CheckboxGroup
                                    name="occupants"
                                    value={this.state.occupants}
                                    onChange={this.occupantsChanged} className="CheckboxGroup">

                                    <label className="labelCheckBox"><Checkbox value="2"/> 2</label>
                                    <label className="labelCheckBox"><Checkbox value="4"/> 4</label>
                                    <label className="labelCheckBox"><Checkbox value="5"/> 5</label>
                                    <label className="labelCheckBox"><Checkbox value="7"/> 7</label>
                                    <label className="labelCheckBox"><Checkbox value="8"/> 8</label>
                                </CheckboxGroup>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="groups-section">
                    <div className="groups-title">
                        Category
                    </div>
                    <div className="groups-list">
                        <CheckboxGroup
                            name="category"
                            value={this.state.category}
                            onChange={this.categoryChanged} className="CheckboxGroup">

                            <ul>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Standard"/> Standard</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Premium"/> Premium</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Full Size"/> Full Size</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Luxury"/> Luxury</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Compact SUV"/> Compact SUV</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Standard SUV"/> Standard SUV</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Intermediate SUV"/> Intermediate SUC</label>
                                </li>
                                <li>
                                    <label className="labelCheckBox"><Checkbox value="Full Size SUV"/> Full Size SUV</label>
                                </li>
                            </ul>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllCars : () => dispatch(carActions.getAllCars())
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarFilters {...props}/>));
