import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';
import './listings.css';
import Search from './search/search';
import Filters from './filters/filters';
import Sorts from './sorts/sorts';
import FlightRow from './flightRow/flightRow';
import HotelRow from './hotelRow/hotelRow';
import CarRow from './carRow/carRow';
import * as carActions from '../../actions/car';
import * as flightActions from '../../actions/flight';
import * as hotelActions from '../../actions/hotel';


class Listings extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            category : this.props.match.params.category,
            queryParams : queryString.parse(this.props.location.search)
        }
        this.loadPage = this.loadPage.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    componentDidMount(){
        this.loadPage(this.state.queryParams);
    }

    loadPage(queryParams,filters){
        if(this.state.category === 'cars'){
            this.props.getAllCars(queryParams,filters) ;
        } else if(this.state.category === 'flights') {
            this.props.getAllFlights(queryParams,filters);
        } else {
            this.props.getAllHotels(queryParams,filters);
        }
    }

    applyFilters(filters){
        this.loadPage(this.state.queryParams,filters);
    }

    render() {

        return (
			<div className="listings-page-wrapper">
				<div className="inline-search-container">
					<Search/>
				</div>
				<div className="page-container">
					<div className="filters-container">
                        <Filters applyFilters={this.applyFilters}/>
					</div>
					<div className="center-container">
						<div className="sorting-container">
							<Sorts/>
						</div>
						<div className="data-container">
                            {
                                this.props.listings.length > 0 ? (
                                    this.props.listings.map((listing , key) => {
                                        if(this.state.category === 'hotels') {
                                            return <HotelRow data={listing} key={key}/>
                                        } else if (this.state.category === 'flights') {
                                            return <FlightRow data={listing} key={key}/>
                                        } else {
                                            return <CarRow data={listing} key={key}/>
                                        }
                                    })
                                ) : (
                                    <h3 className="empty-message">No results to display</h3>
                                )
                            }
						</div>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllCars : (queryParams,filters) => dispatch(carActions.getAllCars(queryParams,filters)),
        getAllFlights : (queryParams,filters) => dispatch(flightActions.getAllFlights(queryParams,filters)),
        getAllHotels : (queryParams,filters) => dispatch(hotelActions.getAllHotels(queryParams,filters))
    }
}

function mapStateToProps(state) {
    return {listings:state.listingsReducer.listings};
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <Listings {...props}/>));
