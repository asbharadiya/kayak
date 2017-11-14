import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {

  render() {
    return (
      <header>
        
      </header>
    );
  }
}


function mapStateToProps(state) {
    return {isLogged:state.isLogged};
}

export default connect(mapStateToProps)(Header);
