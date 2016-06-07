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
      categories: Object.keys(this.props.algorithms)
    }
    console.log(this.state);
  }

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  categoryClick(category) {
    this.setState({
      currentCategory: category
    })
  }

  upperCaseFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  render() {
    let cx = classNames.bind(s);

    let algorithms = this.state.categories.map((category) => {
      let className = cx({
        active: this.state.currentCategory === category
      });
      let display = this.upperCaseFirst(category);
      return (
        <li className={className} key={category} onClick={this.categoryClick.bind(this, category)}>
          <a href="#">{display}</a>
        </li>
      )
    })

    return (
      <div className="container">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo center">Algorithms</a>
              <ul className="left hide-on-med-and-down">
                {algorithms}
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
