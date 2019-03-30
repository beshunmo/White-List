import React, { Component } from 'react';
import './shop.css';
import moment from 'moment';

export default class Shop extends Component {
  renderShopLink = () => {
    switch (this.props.name) {
      case 'utkonos.ru': return <a className="link-shop-product" href={this.props.link}>Утконос</a>;
      case 'instamart.ru': return <a className="link-shop-product" href={this.props.link}>Инстамарт</a>;
      case 'perekrestok.ru': return <a className="link-shop-product" href={this.props.link}>Перекресток</a>;
      default:
    }
  }

  render() {
    moment.locale('ru');
    return (
    <div className="info-product">
      {this.renderShopLink()}
      <div>Цена: {this.props.price} руб.</div>
      <div>Наличие: {this.props.presence}</div>
      {/* <div>Дата обновления: {moment(Date.parse(this.props.lastUpdate)).format('llll')} */}
      {/* </div> */}
    </div>
    );
  }
}
