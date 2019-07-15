import React, { Component } from 'react';

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: false
    }
  }

  handleSelected = () => {
    this.setState({isSelected: !this.state.isSelected})
  }


  render() {
    const {isSelected} = this.state
    let mainNavigation = 
      <section id='menu'>
        <ul>
          <li>Assets</li>
          <li>Parts and Inventory</li>
          <li>History</li>
        </ul>
      </section>

return (
      <div>
      <section className='nav-wrapper'>
        <input type='checkbox' className='nav-toggle' id='hamburger'
        onClick={this.handleSelected} 
        />
        <label htmlFor='hamburger'>
        <div className='bar nav-top'></div>
        <div className='bar nav-middle'></div>
        <div className='bar nav-bottom'></div>
        </label>
      </section>
      <section>
        {isSelected && mainNavigation}
      </section>
        </div>
    )
  }
};

export default Nav;