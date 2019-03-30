import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from './logo.png';
import { inputTextAC } from '../../redux/actions/header-actions';
import { productsToReduxAC, cartToReduxAC, showProductsAC } from '../../redux/actions/home-page-actions';
import { selectProducts, selectCart, selectShowProducts } from '../../redux/selectors/home-page-selectors';
import { selectSearchText } from '../../redux/selectors/header-selector';

const mapStateToProps = state => ({
  cartFromRedux: selectCart(state),
  selectProducts: selectProducts(state),
  productsFromRedux: selectProducts(state),
  selectShowProducts: selectShowProducts(state),
  searchText: selectSearchText(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  cartToRedux: cartToReduxAC,
  inputText: inputTextAC,
  productsToReduxAC,
  showProductsAC
}, dispatch);

class HeaderPage extends Component {
  state = {
    text: ''
  }

  searchProduct = () => {
    const text = this.props.searchText;
    console.log('TCL: HeaderPage -> searchProduct -> text', text);

    const regexp = new RegExp(text, 'i');

    const products = this.props.productsFromRedux.filter(item => regexp.test(item.name.toLowerCase()));

    this.props.showProductsAC(products);
  }

  hahdleClickSearch = () => {
    this.searchProduct();
  }

  hahdleChangeSearch = async (e) => {
    await this.props.inputText(e.target.value);
    this.searchProduct();
  }

  render() {
    return (
      <div className="header-container">
        <div className="header__bar">
          <div className="header__logo">
            <Link to="/" className="header__logo-img" role="img" title="Выбрирайте лучшие цены в интернет магазинах Москвы!">
              <i className="fas fa-dove"></i>
              <img src={logo} alt="Выбрирайте лучшие цены в интернет магазинах Москвы!" />
            </Link>
          </div>
          <div className="header__search">
            <div className="js-header-search-block full-header-search">
              <input onInput={this.hahdleChangeSearch} className="full-header-search__field tst_header-search js-search-input ui-autocomplete-input"
                type="search" name="search" placeholder="Поиск товаров" data-key="searchField"
                data-id="search" />
              <button onClick={this.hahdleClickSearch} className="full-header-search__btn js-search-btn" type="submit" aria-label="Искать">
                <svg id="svg__search" viewBox="0 0 32 32" width="30px" height="30px">
                  <title>search</title>
                  <path
                    d="M26.7 25.3l-5-5c1.3-1.6 2.1-3.7 2.1-5.9 0-5.2-4.2-9.4-9.4-9.4s-9.4 4.2-9.4 9.4c0 5.2 4.2 9.4 9.4 9.4 2.2 0 4.3-0.8 5.9-2.1l5 5c0.2 0.2 0.5 0.3 0.7 0.3 0.3 0 0.5-0.1 0.7-0.3 0.4-0.4 0.4-1 0-1.4zM7 14.4c0-4.1 3.3-7.4 7.4-7.4s7.4 3.3 7.4 7.4c0 4.1-3.3 7.4-7.4 7.4-4.1 0.1-7.4-3.3-7.4-7.4z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div className="header-repeat js-header-repeat">
            <button className="header-repeat__button js-popup-header-repeat-button">
              <svg id="svg__repeat" viewBox="0 0 25 24" width="30px" height="30px">
                <title>repeat</title>
                <path
                  d="M3.92519 9.01244L3.92581 9.01027C5.10905 4.9035 8.62416 2.16302 12.643 2.16302C16.7768 2.16302 20.4124 5.12822 21.4664 9.39693C21.5431 9.75453 21.8585 9.99067 22.1912 9.99067C22.1923 9.99067 22.194 9.9907 22.1962 9.99075C22.2205 9.99129 22.3062 9.99317 22.4003 9.95778C22.8213 9.83395 23.0013 9.39548 22.9153 9.03055L22.9153 9.03055L22.9145 9.02699C21.7 4.09222 17.4855 0.625 12.643 0.625C7.93158 0.625 3.85548 3.83343 2.48721 8.56498C2.37284 8.9549 2.5736 9.39142 2.9769 9.52508C3.39501 9.66365 3.80905 9.40655 3.92519 9.01244Z"
                ></path>
                <path
                  d="M2.65872 10.1753L2.66546 10.1779L2.67231 10.1804C2.72871 10.2003 2.82379 10.2281 2.93352 10.2281C3.04496 10.2281 3.13462 10.2042 3.18426 10.191C3.18646 10.1904 3.18858 10.1898 3.19062 10.1893L3.22539 10.1801L3.25778 10.1644L7.0597 8.32569L7.05971 8.3257L7.06277 8.32419C7.43127 8.14181 7.59154 7.68919 7.42544 7.31171C7.26303 6.94264 6.82102 6.73283 6.42245 6.92869L3.33828 8.41758L2.07199 5.04848C1.92588 4.64222 1.48042 4.44621 1.09441 4.60734C0.68504 4.77271 0.538996 5.23689 0.675492 5.59878L2.23473 9.73281C2.30669 9.93268 2.4555 10.0944 2.65872 10.1753Z"
                ></path>
                <path
                  d="M2.08417 14.9696L2.08416 14.9696L2.08481 14.9723C3.28674 19.9082 7.50197 23.3752 12.3565 23.3752C17.0564 23.3752 21.1315 20.166 22.5244 15.4361C22.6393 15.0459 22.4386 14.6088 22.035 14.4751C21.6169 14.3365 21.2028 14.5936 21.0867 14.9877L21.0861 14.9899C19.9028 19.0967 16.3877 21.8371 12.3688 21.8371C8.23416 21.8371 4.59786 18.8706 3.54482 14.6004C3.44729 14.1733 3.03013 13.9295 2.6282 14.0344C2.18646 14.1463 1.99619 14.5964 2.08417 14.9696Z"></path>
                <path
                  d="M22.9171 18.9817L22.9171 18.9818L22.9191 18.9869C23.0336 19.2782 23.3018 19.4744 23.6149 19.4744C23.7438 19.4744 23.8403 19.4347 23.9067 19.4066C24.3155 19.241 24.4614 18.7771 24.3249 18.4154L22.7657 14.2814C22.6937 14.0815 22.545 13.9197 22.3417 13.8389C22.1233 13.7521 21.9196 13.7915 21.7673 13.852L21.755 13.8569L21.7431 13.8627L17.9288 15.7014L17.9288 15.7014L17.9253 15.7031C17.5568 15.8855 17.3965 16.3381 17.5626 16.7156C17.725 17.0847 18.1671 17.2945 18.5656 17.0986L21.6498 15.6097L22.9171 18.9817Z"
                ></path>
              </svg>
              Повтор заказа
        </button>
          </div>
        </div>
        <div className="header__cart">
          <div className="cart-info">
            <div className="cart-info__list">
              <div className="cart-info__item">
                <Link to='/favorite' className="header-favorites__link js-favorite-link" >
                  <svg id="svg__heart" viewBox="0 0 37 30" width="34px" height="34px">
                    <path className="st1"
                      d="M18.5 29.5c-.2 0-.4-.1-.6-.2C17.2 29 2 20.8 2 10.4 2 5 6.2.5 11.3.5c2.8 0 5.5 1.4 7.2 3.6C20.2 1.9 22.8.5 25.7.5 30.8.5 35 5 35 10.4c0 10.5-15.2 18.7-15.8 19-.3.1-.5.1-.7.1zM11.3 3.6c-3.5 0-6.4 3.1-6.4 6.8 0 7.5 10.8 14.3 13.6 15.9 2.8-1.6 13.6-8.4 13.6-15.9 0-3.7-2.9-6.8-6.4-6.8-2.5 0-4.7 1.5-5.7 3.8-.3.5-.8 1-1.5 1-.6 0-1.2-.3-1.5-1-.1-.2-.2-.3-.3-.5-1.1-2.2-3.2-3.3-5.4-3.3z">
                    </path>
                  </svg>
                  <span className="header-favorites__count js-header__favorite-count">
                    1
                  </span>
                </Link>
              </div>
              <div className="cart-info__item js-popup-cart">
                <Link to="/cart" className="cart-info__link js-popup-cart__link" >
                  <span className="cart-info__icon js-popup-cart__icon" title="Товары в корзине">
                    <svg id="svg__cart" viewBox="0 0 32 32" width="34px" height="34px">
                      <title>cart</title>
                      <path
                        d="M13.005 26.227c0 1.166-0.946 2.112-2.112 2.112s-2.112-0.946-2.112-2.112c0-1.166 0.946-2.112 2.112-2.112s2.112 0.946 2.112 2.112z">
                      </path>
                      <path
                        d="M27.2 26.227c0 1.166-0.946 2.112-2.112 2.112s-2.112-0.946-2.112-2.112c0-1.166 0.946-2.112 2.112-2.112s2.112 0.946 2.112 2.112z">
                      </path>
                      <path
                        d="M0 5.85h5.734l2.56 16.986h16.64c0.002 0 0.004 0 0.006 0 1.605 0 2.945-1.132 3.267-2.64l-17.583-0.022-0.461-2.995h16.717c0.002 0 0.004 0 0.006 0 1.605 0 2.945-1.132 3.267-2.64l-20.387-0.022-0.422-2.79h19.456c0.002 0 0.004 0 0.006 0 1.605 0 2.945-1.132 3.267-2.64l-23.113-0.022-0.922-5.862h-4.8c0 0-0.001 0-0.001 0-1.593 0-2.922 1.128-3.234 2.628z">
                      </path>
                    </svg>
                    <span className="cart-info__icon-count js-popup-cart__count">
                      {this.props.cartFromRedux.length}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderPage);

export default Header;
