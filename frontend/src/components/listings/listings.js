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


class Listings extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            category : this.props.match.params.category
        }
        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount(){
        this.loadPage();
    }

    loadPage(){
        if(this.state.category === 'cars'){
            this.props.getAllCars() ;
        }
    }

    render() {

        return (
			<div className="listings-page-wrapper">
				<div className="inline-search-container">
					<Search/>
				</div>
				<div className="page-container">
					<div className="filters-container">
                        <Filters/>
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
                                    <h3>No results to display</h3>
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
        getAllCars : () => dispatch(carActions.getAllCars())
    }
}

function mapStateToProps(state) {
    return {listings:state.listingsReducer.listings};
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <Listings {...props}/>));
