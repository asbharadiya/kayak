import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './sorts.css';

class Sorts extends Component {

  	render() {
        const category = this.props.match.params.category;
    	return (
      		<div className="sorting-content">
                {
                    category === 'hotels' ? (
                        <div></div>
                    ) : category === 'flights' ? (
                        <div></div>
                    ) : (
                        <div></div>
                    )
                }
      		</div>
    	);
  	}
}

export default withRouter(props => <Sorts {...props}/>);
