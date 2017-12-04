import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
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
import * as utilActions from '../../actions/util';
import AuthModal from '../authModal/authModal';
import * as analytics from '../../actions/analytics';

class Listings extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            category : this.props.match.params.category,
            queryParams : this.props.location.search,
            showAuthModal:false,
            filters:{},
            sorts:{}
        }
        this.closeAuthModal = this.closeAuthModal.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.applySorts = this.applySorts.bind(this);
        this.onBookClick = this.onBookClick.bind(this);
    }

    trackClick(click, page) {
        var payload = {'click' : click, 'page' : page};
        this.props.trackClick(payload);
    }

    closeAuthModal(){
        this.setState({
            showAuthModal:false
        })
    }

    componentDidMount(){
        this.loadPage(this.state.queryParams);
    }

    componentWillUnmount(){
        this.props.clearListingsFromStore();
    }

    loadPage(queryParams,filters,sorts){
        if(this.state.category === 'cars'){
            this.trackClick('cars-filters', '/cars/listings')
            this.props.getAllCars(queryParams,filters,sorts) ;
        } else if(this.state.category === 'flights') {
            this.trackClick('flights-filters', '/flights/listings')
            this.props.getAllFlights(queryParams,filters,sorts);
        } else {
            this.trackClick('hotels-filters', '/hotels/listings')
            this.props.getAllHotels(queryParams,filters,sorts);
        }
    }

    applyFilters(filters){
        this.setState({
            filters:filters
        }, function(){
            this.loadPage(this.state.queryParams,this.state.filters,this.state.sorts);
        });
    }

    onBookClick(id){
        if(this.props.isLogged){
            this.trackClick('Book-'+this.state.category, '/'+this.state.category+'/listings');
            this.props.history.push('/'+this.state.category+'/'+id+'/checkout'+this.state.queryParams);
        } else {
            this.trackClick('Anonymous-Book-'+this.state.category, '/'+this.state.category+'/listings');
            this.setState({
                showAuthModal:true
            })
        }
    }

    applySorts(sorts){
        this.setState({
            sorts:sorts
        }, function(){
            this.loadPage(this.state.queryParams,this.state.filters,this.state.sorts);
        });
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
							<Sorts applySorts={this.applySorts}/>
						</div>
						<div className="data-container">
                            {
                                this.props.listings.total > 0 ? (
                                    this.props.listings.docs.map((listing , key) => {
                                        if(this.state.category === 'hotels') {
                                            return <HotelRow data={listing} key={key} onBookClick={this.onBookClick}/>
                                        } else if (this.state.category === 'flights') {
                                            return <FlightRow data={listing} key={key} onBookClick={this.onBookClick}/>
                                        } else {
                                            return <CarRow data={listing} key={key} onBookClick={this.onBookClick}/>
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
                <AuthModal showAuthModal={this.state.showAuthModal} closeAuthModal={this.closeAuthModal}></AuthModal>
			</div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllCars : (queryParams,filters,sorts) => dispatch(carActions.getAllCars(queryParams,filters,sorts)),
        getAllFlights : (queryParams,filters,sorts) => dispatch(flightActions.getAllFlights(queryParams,filters,sorts)),
        getAllHotels : (queryParams,filters,sorts) => dispatch(hotelActions.getAllHotels(queryParams,filters,sorts)),
        clearListingsFromStore : () => dispatch(utilActions.clearListingsFromStore()),
        trackClick : (payload) => dispatch(analytics.trackClick(payload))
    }
}

function mapStateToProps(state) {
    return {
        listings:state.listingsReducer.listings,
        isLogged:state.authReducer.isLogged
    };
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <Listings {...props}/>));
