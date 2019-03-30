import React, { Component } from 'react';
import './breadcrumbs.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { selectUsername } from '../../redux/selectors/app-selectors';
import { selectPageName } from '../../redux/selectors/home-page-selectors';

const mapStateToProps = state => ({
  usernameFromRedux: selectUsername(state),
  selectPageName: selectPageName(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

class Breadcrumbs extends Component {
  viewAuth = () => {
    const { usernameFromRedux } = this.props;
    if (usernameFromRedux !== undefined) {
      return <div><Link to='/profile'>{usernameFromRedux}</Link>
        <a href="/user/logout">Выйти</a>
      </div>;
    }
    return <div> <a className="profile-link" data-toggle="modal" data-target="#exampleModalCenter1">Регистрация</a>
      <a className="profile-link" data-toggle="modal" data-target="#exampleModalCenter">Войти</a>
    </div>;
  }


  render() {
    return (
      <div className="xf-wrapper relative">
        <ul id="breadcrumbs-one" className="xf-caption__breadcrumbs xf-breadcrumbs">
          <li className="xf-breadcrumbs__item ">
          <Link to="/" className="xf-breadcrumbs__link" >Главная</Link>
          </li>
          <li className="current xf-breadcrumbs__item _last">
            <a href="" className="current">{this.props.selectPageName}</a>
          </li>
        </ul>
        <div className="absolute">
          {this.viewAuth()}
        </div>
        <div>
          <h1 className="xf-caption__title">{this.props.selectPageName}</h1>
        </div>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Вход</h5>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="/user/login" method="post">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input name="username" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-secondary">Войти</button>
                  <div className="footer-social__item _fb footer-social__item-modal">
                    <a className="footer-social__link" href="/user/auth/facebook" title="Facebook">
                      <svg id="svg__facebook" viewBox="0 0 32 32" width="100%" height="100%">
                        <title>facebook</title>
                        <path
                          d="M7.441 10.251h4.686v-2.583c0-1.474 0.038-3.76 1.112-5.166 1.13-1.539 2.932-2.527 4.965-2.527 0.138 0 0.276 0.005 0.412 0.014 0.265-0.014 0.597-0.022 0.931-0.022 1.861 0 3.667 0.233 5.392 0.67l-1.015 5.088c-0.826-0.241-1.78-0.394-2.764-0.422-1.361 0-2.562 0.48-2.562 1.828v3.12h5.502l-0.384 4.766h-5.339v16.846h-6.254v-16.846h-4.686v-4.766z">
                        </path>
                      </svg>
                    </a>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Регистрация</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <form action="/user/signup" method="post">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input name="username" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input name="email" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-secondary">Зарегистрироваться</button>
                  <div className="footer-social__item _fb footer-social__item-modal">
                    <a className="footer-social__link" href="/user/auth/facebook" title="Facebook">
                      <svg id="svg__facebook" viewBox="0 0 32 32" width="100%" height="100%">
                        <title>facebook</title>
                        <path
                          d="M7.441 10.251h4.686v-2.583c0-1.474 0.038-3.76 1.112-5.166 1.13-1.539 2.932-2.527 4.965-2.527 0.138 0 0.276 0.005 0.412 0.014 0.265-0.014 0.597-0.022 0.931-0.022 1.861 0 3.667 0.233 5.392 0.67l-1.015 5.088c-0.826-0.241-1.78-0.394-2.764-0.422-1.361 0-2.562 0.48-2.562 1.828v3.12h5.502l-0.384 4.766h-5.339v16.846h-6.254v-16.846h-4.686v-4.766z">
                        </path>
                      </svg>
                    </a>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


const BreadcrumbsApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Breadcrumbs);
export default BreadcrumbsApp;
