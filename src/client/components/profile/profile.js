import React, { Component } from 'react';
import './profile.css';
import { connect } from 'react-redux';
import CartPage from '../cart/cart';
import { pageNameToReduxAC } from '../../redux/actions/home-page-actions';
import { bindActionCreators } from 'redux';


const mapStateToProps = state => ({
  // productsFromRedux: selectProducts(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  pageNameToRedux: pageNameToReduxAC
}, dispatch);


class Profile extends Component {
  state = {
    carts: []
  }

  viewCarts = () => {
    const { carts } = this.state;
    return carts.map(item => (
      <CartPage key={item._id} cart={item.cart}/>
    ));
  }


  getCarts = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.status === 200) {
        const carts = await response.json();
        await this.setState({ carts });
        console.log(carts);
      }
    } catch (e) {
    }
  };

  componentDidMount() {
    this.props.pageNameToRedux('Профиль');
    this.getCarts();
  }

  render() {
    return (
      <div>
        {this.viewCarts()}
      </div>
    );
  }
}


const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfilePage;
