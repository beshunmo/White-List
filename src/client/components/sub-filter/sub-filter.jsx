import React, { Component } from 'react';
import './sub-filter.css';

export default class SubFilter extends Component {
  handleClickFilter = (e) => {
    const shopsName = e.target.getAttribute('shopsname');
    this.props.onClick(shopsName);
  }

  render() {
    return (
      <li className="catalog-market__item">
        <div className="catalog-market__link" href="">
          <div className="market-icon">
            <i className="fas fa-dove fa-dove-icon"></i>
          </div>
          <span onClick={this.handleClickFilter} className="catalog-market__text" shopsname={this.props.shopsName}>{this.props.title}</span>
        </div>
      </li>
    );
  }
}
