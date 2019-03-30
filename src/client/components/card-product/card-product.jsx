import React, { Component } from 'react';
import './card-product.css';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { inputTextAC } from '../../redux/actions/head-actions';
// import { selectText } from '../../redux/selectors/head-selectors';

// const mapStateToProps = state => ({
//   textInput: selectText(state),
//   item: state.items.items
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   inputText: inputTextAC
// }, dispatch);

export default class CardProductPage extends Component {
  // openBigProduct = (id) => {
  //   console.log('test');
  //   <Redirect path='/'/>;
  //   // this.props.history.push('/');
  // }
  randomNum = () => Math.ceil(Math.random() * 99)

  handleClickCardBtn = (e) => {
    const articul = e.target.getAttribute('id');

    this.props.onClick(articul);
  }

  render() {
    return (
      <div className="js-catalog-product _additionals catalog__item" >
        <div className="product js-product" id="ui-id-5">
          <div className="product__picture product-picture">
              <Link to={`/home/${this.props.id}`} className="product-picture__link js-product__image">
              <img data-src="/src/product.file/list/image/14/14/21414.jpeg"
                className="js-lazy swiper-lazy product-picture__img "
                src={this.props.img} />
                </Link>
          </div>
          <div className="product__favorite-rating-line">
            <a href="/catalog/moloko-syr-yaytsa/tvorog-syrki/lactica-tvorog-myagk-diet-obezj-4-5-120g--314412/reviews"
             className="product__rating product-rating _link">
              <div className="product__rating product-rating  ">
                <ul className="product-rating__stars">
                  <li className="product-rating__star _active">
                    <i className="fas fa-star"></i>
                  </li>
                  <li className="product-rating__star _active">
                    <i className="fas fa-star"></i>
                  </li>
                  <li className="product-rating__star _active">
                    <i className="fas fa-star"></i>
                  </li>
                  <li className="product-rating__star _active">
                    <i className="fas fa-star"></i>
                  </li>
                  <li className="product-rating__star _active">
                    <i className="fas fa-star"></i>
                  </li>
                </ul><span className="product-rating__count _short">{this.randomNum()}</span>
              </div>
              </a>
            <div className="product__favorite product-favorite js-product__favorite " data-key="favorites">
              <i className="fas fa-heart"></i>
            </div>
          </div>
          <div className="product__title product-title">
            <a href={this.props.href}
              className="product-title__link js-product__title" title={this.props.name}>
              {this.props.name}
        </a>
          </div>
          <div className="product__cost price_height">
            <div className="price product-cost__current js-product__cost " >
              <span className="price__rouble">{this.props.price}&nbsp;</span>
              <span className="price__unit">
                р/шт
          </span>
            </div>
          </div>
          <div class="product__cost price_height">
                   <div class="product-cost__old-price">
                      <div class="product-cost__prev" ><span class="price__rouble">{this.props.maxPrice}</span>
                      <span class="price__unit"> р/шт</span></div>
                      <p>-{Math.round(((this.props.maxPrice - this.props.price) / this.props.maxPrice) * 100)}%</p>
                   </div>
           </div>
            <div className="product__to-cart product-to-cart product_calc">
            <button id={this.props.id} onClick={this.handleClickCardBtn} className="add-to-cart-btn js-product__add  ">
              В корзину
          <i className="fas fa-shopping-basket"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// const CardProduct = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CardProductPage);

// export default CardProduct;
