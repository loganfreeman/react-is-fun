import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Games.css';
import Sudoku from './Sudoku';
import Tetris from './Tetris';
import classNames from 'classnames/bind';

class Games extends Component {

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string,
    menus: React.PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      currentGame: undefined
    }
  }

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  menuItemClick(menu) {
    this.setState({
      currentGame: menu
    })
  }

  getGameComponent() {
    if(!this.state.currentGame) {
      return <h1>Please see a game to play!</h1>
    }

    switch(this.state.currentGame.key) {
      case 'sudoku':
        return <Sudoku />;
      case 'tetris':
        return <Tetris />;
      default:
        return <h1>This should not happen!</h1>
    }
  }

  render() {
    let cx = classNames.bind(s);
    let that = this;
    let menus = this.props.menus.map((menu) => {
      let className = cx({
        active: that.state.currentGame && that.state.currentGame.key === menu.key
      })
      return (
        <li className={className} key={menu.key} onClick={this.menuItemClick.bind(this, menu)}>
          <a href="#">{menu.text}</a>
        </li>
      )
    })

    let gameComponent = this.getGameComponent();


    return (
      <div className={s.root}>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo center">Games</a>
              <ul className="left hide-on-med-and-down">
                {menus}
              </ul>
            </div>
          </nav>
        </div>
        <div className={s.container}>
          {gameComponent}
        </div>
      </div>
    );
  }

}


export default withStyles(s)(Games);
