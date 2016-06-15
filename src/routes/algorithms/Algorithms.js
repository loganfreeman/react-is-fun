import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Algorithms.css';
import classNames from 'classnames/bind';
import GridListGenerator from './grid';
import CardExampleWithAvatar from './parser';

import {parse} from 'acorn';

import * as acorn from 'acorn';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    title: PropTypes.string,
    algorithms: React.PropTypes.array.isRequired,
    itemClick: React.PropTypes.func
  };

  static events = ['mousedown', 'touchstart'];

  boundOutsideClickHandler = this.outsideClickHandler.bind(this);

  dropdownClick() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  componentDidMount() {
    this.enableOnClickOutside();
  }

  componentWillUnmount() {
    this.disableOnClickOutside();
  }

  enableOnClickOutside() {
    Dropdown.events.forEach((eventName) => document.addEventListener(eventName, this.boundOutsideClickHandler));
  }

  disableOnClickOutside() {
    let fn = this.outsideClickHandler.bind(this);
    Dropdown.events.forEach((eventName) => document.removeEventListener(eventName, this.boundOutsideClickHandler));
  }

  outsideClickHandler(event) {
    if (!this.refs.dropdownContainer.contains(event.target)) {
      this.setState({
        isActive: false
      })
    }
  }

  menuItemClick(algorithm) {
    this.props.itemClick(algorithm);
    this.setState({
      isActive: false
    })
  }

  render() {
    let list = this.props.algorithms.map((algorithm, i) => {
      return (
        <li key={i} onClick={() => this.menuItemClick(algorithm)}><a href="#!">{algorithm.text}</a></li>
      );
    });
    let btnClassName = classNames({
      "dropdown-button": true,
      "active": this.state.isActive
    });

    let dropdownContentClassName = classNames({
      "dropdown-content": true,
      "active": this.state.isActive
    })

    let dropdownContentStyle;

    if (this.state.isActive) {
      dropdownContentStyle = {
        display: 'block' ,
        opacity: 1
      }
    } else {
      dropdownContentStyle = {
        display: 'none',
        opacity: 0,
      }
    }
    return (
      <div ref='dropdownContainer'>
        <a className={btnClassName} href="#!" onClick={this.dropdownClick.bind(this)}>{this.props.title}<i className="material-icons right">arrow_drop_down</i></a>
        <ul className={dropdownContentClassName} style={dropdownContentStyle}>
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
    this.setState({
      currentAlgorithm: item,
      isParser: false
    })
  }

  showParser() {
    this.setState({
      isParser: true,
      currentAlgorithm: undefined
    })
  }

  parse() {
    let code = document.getElementsByName("textarea_code")[0];
    let str = code.value;
    this.setState({
      parseResult: parse(str),
      tokens: [...acorn.tokenizer(str)]
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

    let grid;

    if(this.state.currentAlgorithm) {
      grid = GridListGenerator(this.state.currentAlgorithm.text)
    } else if(this.state.isParser) {
      grid = CardExampleWithAvatar(this.parse.bind(this));
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul className="left hide-on-med-and-down">
              {algorithms}
            </ul>
            <ul className="right hide-on-med-and-down">
              <li><a onClick={this.showParser.bind(this)}>Parser</a></li>
            </ul>
          </div>
        </nav>
        <div className="row">
          {grid}
        </div>
      </div>
    );
  }

}


export default withStyles(s)(Algorithms);
