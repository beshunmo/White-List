import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardProduct from '../card-product/card-product';
import SubFilter from '../sub-filter/sub-filter';
import './home-page.css';
import {
  productsToReduxAC, cartToReduxAC, showProductsAC, pageNameToReduxAC
} from '../../redux/actions/home-page-actions';
import { selectProducts, selectCart, selectShowProducts } from '../../redux/selectors/home-page-selectors';
import { selectSearchText } from '../../redux/selectors/header-selector';
import elbrus from './elbrus.png';

const mapStateToProps = state => ({
  cartFromRedux: selectCart(state),
  productsFromRedux: selectProducts(state),
  searchText: selectSearchText(state),
  showProducts1: selectShowProducts(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  cartToRedux: cartToReduxAC,
  productsToRedux: productsToReduxAC,
  showProducts: showProductsAC,
  pageNameToRedux: pageNameToReduxAC
}, dispatch);

class HomePage extends Component {
  state = {
    shops: [],
    currentPage: 1,
    productsPerPage: 6
  }

  componentDidMount() {
    this.getCart();
    this.getShops();
    this.getProducts();
    this.props.pageNameToRedux('Каталог');
  }

  handleClickCardBtn = (articul) => {
    const cart = this.props.cartFromRedux;
    const item = this.props.productsFromRedux.find(item => item._id === articul);

    this.props.cartToRedux(cart.concat(item));
    localStorage.setItem('cart', JSON.stringify(cart.concat(item)));
  }

  handleClickPagination = (event) => {
    console.log('TCL: HomePage -> handleClickPagination -> event', event.target.id);
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleClickPaginatorMore = () => {
    this.setState({
      productsPerPage: this.state.productsPerPage + 6
    });
  }

  handleClickPaginatorPrev = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  handleClickPaginatorNext = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  }

  viewCards = () => {
    const { currentPage, productsPerPage } = this.state;
    const { showProducts1 } = this.props;
    const indexOfLastproduct = currentPage * productsPerPage;
    const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
    const currentproducts = showProducts1.slice(indexOfFirstproduct, indexOfLastproduct);

    return currentproducts.map(item => (
      <CardProduct
        onClick={a => this.handleClickCardBtn(a)}
        key={item._id}
        id={item._id}
        img={item.img}
        name={item.name}
        price={item.lowPrice}
        maxPrice={item.maxPrice}
      /> // eslint-disable-line
    ));
  }

  handleClickFilter = (shopsName) => {
    const { shops } = this.state;
    if (shopsName === 'allProducts') {
      this.props.showProducts(this.props.productsFromRedux);
    } else {
      const productsShop = shops.filter((item) => {
        if (item.name === shopsName) { return item; }
      });

      const products = this.props.productsFromRedux.filter((product) => {
        for (let i = 0; i < productsShop.length; i++) {
          if (product._id === productsShop[i].product_id) { return product; }
        }
      });

      this.props.showProducts(products);
    }
  }

  viewSubFilter = () => {
    const shops = ['Перекресток', 'Утконос', 'Инстмарт', 'Все продукты', 'Пятерочка', 'Магнит', 'Метро', 'Лента'];
    const shopsName = ['perekrestok.ru', 'utkonos.ru', 'instamart.ru', 'allProducts', 'allProducts', 'allProducts', 'allProducts', 'allProducts'];
    const subFilters = [];

    for (let i = 0; i < shops.length; i += 1) {
      subFilters.push(<SubFilter onClick={s => this.handleClickFilter(s)} shopsName={shopsName[i]} title={shops[i]} key={shops[i]}></SubFilter>);
    }
    return subFilters;
  }

  getCart = () => {
    if (localStorage.getItem('cart') !== null) {
      this.props.cartToRedux(JSON.parse(localStorage.getItem('cart')));
    }
  }

  getProducts = async () => {
    try {
      const products = await fetch('api/products');
      const productsArray = await products.json();

      this.props.showProducts(productsArray);
      this.props.productsToRedux(productsArray);
    } catch (e) {
      console.error(e);
    }
  };

  getShops = async () => {
    try {
      const shops = await fetch('api/products/shop');
      const shopsArray = await shops.json();

      this.setState({ shops: shopsArray });
    } catch (e) {
      console.error(e);
    }
  };

  // test = async () => {
  //   try {
  //     const products = await fetch('api2', {
  //       method: 'POST',
  //       headers: { Apikey: 'lK8nk2JQdQOK4bkv4ImomBhxMWKSG2X6' },
  //       body: JSON.stringify({
  //         params: {
  //           filters: {
  //             page: 1,
  //             limit: 100
  //           },
  //           sources: {
  //             add: true,
  //             add_term: true
  //           }
  //         }
  //       })
  //     });
  //     const productsObj = await products.json();
  //     console.log(productsObj);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  render() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.showProducts1.length / this.state.productsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      if (this.state.currentPage === number) {
        return (<a key={number} onClick={this.handleClickPagination} className="paginator-activ paginator__item js-paginator__btn" data-type="btn" id={number}>{number}</a>);
      }
      return (<a key={number} onClick={this.handleClickPagination} className="paginator__item js-paginator__btn" data-type="btn" id={number}>{number}</a>);
    });

    return (
      <div className='home-page'>
        {/* <button onClick={this.test}>test</button> */}
        <div>
          <h1 className="market-filter"><i className="fas fa-shopping-bag"></i>Maгазины</h1>
          <ul className="catalog-market-list">
            {this.viewSubFilter()}
          </ul>
          <ul className="b js-b _catalog-under-filters" data-id="block_19">
            <li className="js-carousel__item swiper-slide" data-id="banner__1182">
              <a href="https://elbrusboot.camp/">
                <img width='220px' src={elbrus} className="banner-img" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className='cards-products'>
            {this.viewCards()}
          </div>
          <aside className="paginator  js-paginator " data-count="1815">
            <div className="paginator__more-wrap">
              <button onClick={this.handleClickPaginatorMore} type="button" className="paginator__more js-paginator__more-btn">Показать еще товары</button>
            </div>
            <div className="paginator__items-wrap">
              <div className="paginator__items">
                <a onClick={this.handleClickPaginatorPrev} href="#&amp;page=2&amp;sort=rate_desc" className="paginator__item js-paginator__prev">
                  <svg id="svg__previous" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>previous</title>
                    <path d="M23.2 31.467c0.533 0 1.067-0.133 1.467-0.533 0.8-0.8 0.8-2 0-2.8l-12.4-12.4 12.4-12.4c0.8-0.8 0.8-2 0-2.8s-2-0.8-2.8 0l-15.2 15.2 15.2 15.2c0.4 0.4 0.8 0.533 1.333 0.533z"></path>
                  </svg>
                </a>
                {renderPageNumbers}
                <a onClick={this.handleClickPaginatorNext} className="paginator__item js-paginator__next" rel="next">
                  <svg id="svg__next" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>next</title>
                    <path d="M8.667 31.467c-0.533 0-1.067-0.133-1.467-0.533-0.8-0.8-0.8-2 0-2.8l12.4-12.4-12.4-12.4c-0.8-0.667-0.8-2 0-2.8s2.133-0.8 2.933 0l15.2 15.2-15.2 15.2c-0.4 0.4-0.933 0.533-1.467 0.533z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}


const HomePageApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageApp;
