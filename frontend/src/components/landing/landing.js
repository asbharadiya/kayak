import React, { Component } from 'react';
import './landing.css';
import Banner from './banner/banner';
import Content from './content/content';

class Landing extends Component {

  	render() {
  		return (
	      	<div className="landing-page-wrapper">
	        	<Banner/>
	        	<Content/>
	      	</div>
	    );
  	}
}

export default Landing;
