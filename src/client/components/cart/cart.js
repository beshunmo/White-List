import React, { Component } from 'react';
import './cart.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Shop from '../shop/shop';
import CartElement from '../cart-element/cart-element';
import CartOption from '../cart-option/cart-option';
import { selectUsername } from '../../redux/selectors/app-selectors';
// import { inputTextAC } from '../../redux/actions/head-actions';
// import { selectProducts } from '../../redux/selectors/home-page-selectors';
import {
  productsToReduxAC, cartToReduxAC, showProductsAC, pageNameToReduxAC
} from '../../redux/actions/home-page-actions';
import { selectProducts, selectCart, selectShowProducts } from '../../redux/selectors/home-page-selectors';


const mapStateToProps = state => ({
  cartFromRedux: selectCart(state),
  usernameFromRedux: selectUsername(state)
  // productsFromRedux: selectProducts(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  pageNameToRedux: pageNameToReduxAC,
  cartToRedux: cartToReduxAC

  // inputText: inputTextAC
}, dispatch);

class Cart extends Component {
  state = {
    cart: [],
    optionsArray: [],
    saveMessage: ''
  }

  makeCart(draftCart) {
    // debugger
    const cart = [];
    if (draftCart.length > 0) {
      // const lastProduct = draftCart[0];
      // cart.push(lastProduct);
      // debugger
      for (let i = 0; i < draftCart.length; i += 1) {
        let newProduct = true;
        // debugger
        for (const product of cart) { // eslint-disable-line
          if (product._id === draftCart[i]._id) { // eslint-disable-line
            product.quantity += 1;
            newProduct = false;
          }
        }
        if (newProduct) {
          draftCart[i].quantity = 1;
          cart.push(draftCart[i]);
        }
        // debugger
      }
    }
    return cart;
  }

  async componentDidMount() {
    this.props.pageNameToRedux('Корзина');
    if (localStorage.getItem('cart')) {
      this.props.cartToRedux(JSON.parse(localStorage.getItem('cart')));
    }

    if (this.props.cart) {
      await this.setState({ cart: this.props.cart });
    } else {
      const draftCart = JSON.parse(localStorage.getItem('cart'));
      const cart = this.makeCart(draftCart);
      await this.setState({ cart });
    }
    this.getAvailibleOptions(this.state.cart);
  }

  // componentDidUpdate() {
  //   this.getAvailibleOptions(this.state.cart);
  // }

  handleClickQuantity = (e, operation, product) => {
    e.preventDefault();
    // console.log(operation);
    // console.log(product);
    switch (operation) { // eslint-disable-line
      case 'increase':
        product.quantity += 1;
        break;
      case 'decrease':
        if (product.quantity > 0) {
          product.quantity -= 1;
        }
        break;
    }
    // console.log(this.state.cart);
    // console.log(product);
    const { cart } = this.state;
    this.setState({ cart });
    this.getAvailibleOptions(cart);
  }


  viewCart = () => {
    const { cart } = this.state;
    return cart.map(item => (
     <CartElement key={item._id} id={item._id} // eslint-disable-line
     name={item.name} quantity={item.quantity} product={item}
     onClick={(e, operation, product) => this.handleClickQuantity(e, operation, product)} />
    ));
  }

  renderShopLink = (item) => {
    switch (item) {
      case 'utkonos.ru': return <h3><a className="link-shop-product" href={`http://www.${item}`}>Утконос</a></h3>;
      case 'instamart.ru': return <h3><a className="link-shop-product" href={`http://www.${item}`}>Инстамарт</a></h3>;
      case 'perekrestok.ru': return <h3><a className="link-shop-product" href={`http://www.${item}`}>Перекресток</a></h3>;
      default:
    }
  }


  viewShopNames = () => {
    const { optionsArray } = this.state;
    return optionsArray.map(item => (
      <div className='shop-name' key={item.shop}>
      {this.renderShopLink(item.shop)}
      <span className="catalog-market__text" >Цена корзины: <br/> {item.total.toFixed(2)} руб. </span>
      </div>
    ));
  }

  viewOptions = () => {
    const { optionsArray } = this.state;
    return optionsArray.map(item => (
     <CartOption key={item.shop} name={item.shop}
     total={item.total} absence={item.absence} cartProducts={item.cartProducts} />
    ));
  }

  viewButton = () => {
    if ((!this.props.cart) && (this.props.usernameFromRedux !== undefined)) {
      return <div >
      <button type="button" class="btn btn-success" onClick={() => this.saveCart()}>Сохранить корзину</button>
      <span>{this.state.saveMessage}</span></div>;
    }
  }

  getShops = async (id) => {
    try {
      const shops = await fetch(`api/products/${id}`);
      const shopsArray = await shops.json();
      return shopsArray;
    } catch (e) {
      console.error(e);
    }
  };

  saveCart = async () => {
    try {
      const { cart } = this.state;
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart })
      });
      const text = await response.text();
      console.log(text);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  getAvailibleOptions = async (cart) => {
    const optionsArray = [];
    let shopsArray = [];
    for (const product of cart) { // eslint-disable-line
      const shops = await this.getShops(product._id); // eslint-disable-line
      shopsArray = [...shopsArray, ...shops];
    }
    const differentShops = new Set();
    for (const item of shopsArray) { // eslint-disable-line
      differentShops.add(item.name);
    }
    differentShops.forEach((shop) => {
      const shopObj = {};
      shopObj.shop = shop;
      shopObj.absence = [];
      shopObj.cartProducts = [];
      for (const product of cart) { // eslint-disable-line
        let presence = false;
        let productForCart = {};
        for (const item of shopsArray) { // eslint-disable-line
          if (item.name === shop) {
            if (item.product_id === product._id) { // eslint-disable-line
              if (item.presence === 1) {
                const price = item.price * product.quantity;
                if ('total' in shopObj) {
                  shopObj.total += price;
                  presence = true;
                } else {
                  shopObj.total = price;
                  presence = true;
                }
                // debugger
                productForCart = {
                  id: product._id,
                  productName: product.name,
                  productPrice: item.price,
                  productTotal: item.price * product.quantity
                };
                shopObj.cartProducts.push(productForCart);
              }
            }
          }
        }
        if (!presence) {
          // debugger
          productForCart = {
            id: product._id,
            productName: product.name,
            productPrice: '-',
            productTotal: '-'
          };
          shopObj.cartProducts.push(productForCart);
          shopObj.absence.push(product);
        }
      }
      optionsArray.push(shopObj);
    });
    // console.log('TCL: Cart -> getAvailibleOptions -> optionsArray', optionsArray);
    optionsArray.sort((a, b) => {
      if ((a.absence.length === 0) && (a.absence.length === 0)) {
        if (a.total > b.total) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return 0;
    });
    this.setState({ optionsArray });
    // console.log('TCL: Cart -> getAvailibleOptions -> optionsArray', optionsArray);
  }

  render() {
    if (this.state.cart.length > 0) {
      return (
        <div>

      <div className='cart-save-button'> <div className='cart-save'>
      {this.viewButton()} <h3 className='cart-list'>Список продуктов:</h3></div> <div>
      <div className='shops-name'>{this.viewShopNames()} </div></div>
      </div>
      <div className='cart-flex'>
      <div>
        {this.viewCart()} </div>
        <div className='shops'>
       {this.viewOptions()}
      </div>
      </div>
      </div>
      );
    }
    return (<div>
       К сожалению, корзина пуста.
    </div>);
  }
}

const CartPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

export default CartPage;
