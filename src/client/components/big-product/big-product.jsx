import React, { Component } from 'react';
import './big-product.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Shop from '../shop/shop';
import CardProduct from '../card-product/card-product';
// import { inputTextAC } from '../../redux/actions/head-actions';
import { selectProducts } from '../../redux/selectors/home-page-selectors';
import { pageNameToReduxAC } from '../../redux/actions/home-page-actions';
import elbrus from '../home-page/elbrus.png';


const mapStateToProps = state => ({
  productsFromRedux: selectProducts(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  pageNameToRedux: pageNameToReduxAC
}, dispatch);

class BigProductPage extends Component {
  state = {
    id: this.props.match.params.id,
    product: {},
    shops: []
  }


  getProduct = async () => {
    try {
      const product = await fetch(`api/product/${this.state.id}`);
      const productObj = await product.json();
      this.setState({ product: productObj });
    } catch (e) {
      console.error(e);
    }
  };

  getShops = async () => {
    try {
      const shops = await fetch(`api/products/${this.state.id}`);
      const shopsArray = await shops.json();
      this.setState({ shops: shopsArray });
    } catch (e) {
      console.error(e);
    }
  };


  componentDidMount() {
    this.props.pageNameToRedux('Товар');
    this.getShops();
    if (this.props.productsFromRedux.length === 0) { this.getProduct(); }
    if (this.props.productsFromRedux.length !== 0) {
      for (const product of this.props.productsFromRedux) { // eslint-disable-line
        // console.log(product);
        if (product._id === this.state.id) { // eslint-disable-line
          this.state.product = product;
        }
      }
    }
  }

  getPresence = (number) => {
    switch (number) {
      case 0:
        return 'нет в наличии';
      case 1:
        return 'есть в наличии';

      case 2:
        return 'под заказ';
      default:
        return 'нет в наличии';
    }
  }


  viewShops = () => {
    const { shops } = this.state;
    console.log(shops);
    return shops.map(item => (
      <Shop key={item._id} name={item.name} price={item.price} // eslint-disable-line
        presence={this.getPresence(item.presence)} lastUpdate={item.lastUpdate}
        link={item.link} />
    ));
  }


  render() {
    return (
      <div className='flex'>
        <div className="card-big-product">
          <CardProduct img={this.state.product.img} name={this.state.product.name}
            price={this.state.product.lowPrice} maxPrice={this.state.product.maxPrice} id={this.state.product._id} />
        </div>
        <div>{this.viewShops()}</div>
        <ul className="js-b _catalog-under-filters banner-big-product" data-id="block_19">
            <li className="js-carousel__item swiper-slide" data-id="banner__1182">
              <a href="https://elbrusboot.camp/">
                <img width='220px' src={elbrus} className="banner-img" />
              </a>
            </li>
          </ul>
      </div>
    );
  }
}

const BigProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(BigProductPage);

export default BigProduct;
