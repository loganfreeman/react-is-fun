import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Algorithms.css';
import classNames from 'classnames/bind';

class Dropdown extends Component {
  static propTypes = {
    title: PropTypes.string,
    algorithms: React.PropTypes.array.isRequired,
    itemClick: React.PropTypes.func
  };

  render() {
    let list = this.props.algorithms.map((algorithm, i) => {
      return (
        <li key={i} onClick={() => this.props.itemClick(algorithm)}><a href="#!">{algorithm.text}</a></li>
      );
    });
    let triggerName = this.props.title + "-trigger";
    return (
      <div>
        <a className="dropdown-button" href="#!" data-activates={triggerName}>{this.props.title}<i className="material-icons right">arrow_drop_down</i></a>
        <ul id={triggerName} className="dropdown-content">
          {list}
        </ul>
      </div>
    );
  }
}

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

  itemClick(item) {
    console.log(item);
    this.setState({
      currentAlgorithm: item
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

      let algorithms = this.props.algorithms[category];

      return (
        <li className={className} key={category} onClick={this.categoryClick.bind(this, category)}>
          <Dropdown title={this.upperCaseFirst(category)} algorithms={algorithms} itemClick={this.itemClick.bind(this)}/>
        </li>
      )
    })

    return (
      <div className="container">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
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
