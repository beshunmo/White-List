import React, { Component } from 'react';
import './cart-option.css';

export default class CartOption extends Component {
  viewAbsence = () => {
    const { absence } = this.props;
    return absence.map(item => (
      <li key={item._id}>{item.name}</li>
    ));
  }


  viewPrices = () => {
    const { cartProducts } = this.props;
    return cartProducts.map(item => (
      <div className='cart-price' key={item.id}>
      {/* <span className="catalog-market__text" >Название товара: {item.productName}</span> */}
          <span className="catalog-market__text " >{item.productPrice} р/шт | {item.productTotal} руб. </span>
          </div>
    ));
  }

  render() {
    console.log('TCL: CartOption -> render -> cartProducts', this.props.cartProducts);

    return (
      <li >
        <div className="catalog-market__link cart-element-flex-column">
          
          
          {this.viewPrices()}

         {/* <div> Товары которых нет в данном магазине:
           <ol>
           {this.viewAbsence()}
           </ol>
           </div> */}
        </div>
      </li>
    );
  }
}
