import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Algorithms.css';
import classNames from 'classnames/bind';

class Algorithms extends Component {

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string,
    algorithms: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentAlgorithm: undefined,
      categories: Object.keys(this.props.algorithms)
    }
    console.log(this.state);
  }

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  menuItemClick(menu) {
    this.setState({
      currentAlgorithm: menu
    })
  }

  render() {
    let cx = classNames.bind(s);

    return (
      <div className="container">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo center">Algorithms</a>
              <ul className="left hide-on-med-and-down">

              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
        </div>
      </div>
    );
  }

}


export default withStyles(s)(Algorithms);
