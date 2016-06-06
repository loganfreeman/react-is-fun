import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Games.css';
import Sudoku from './Sudoku';
import Tetris from './Tetris';

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
    let menus = this.props.menus.map((menu) => {
      return <li className="menu-item" key={menu.key} onClick={this.menuItemClick.bind(this, menu)}>{menu.text}</li>
    })

    let gameComponent = this.getGameComponent();


    return (
      <div className={s.root}>
        <section className="sidebar">
          <ul className="menu-list">
          {menus}
          </ul>
        </section>
        <div className={s.container}>
          {gameComponent}
        </div>
      </div>
    );
  }

}


export default withStyles(s)(Games);
