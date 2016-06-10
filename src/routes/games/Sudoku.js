import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';
import * as utils from './utils';
import * as game from './SudokuGame';
import {List} from 'immutable';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className={s.tile}>
      </div>
    )
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      return <Tile key={i} />
    })
    return (
      <div className={s.row}>
        {tiles}
      </div>
    )
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      return <Row key={i} />
    })

    return (
      <div className={s.board}>
        {rows}
      </div>
    )
  }
}

class Sudoku extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showJson: false,
      history: List()
    }
  }

  startNewGame() {
    let newGame = game.createGame();
    let rows = utils.partition(newGame.get('cols'), newGame.get('tiles'));

    this.setState({
      game: newGame,
      rows: rows,
      history: this.state.history.push(newGame)
    })
  }

  toggleJsonShow() {
    console.log('toggle json show');
    this.setState({
      showJson: !this.state.showJson
    })
  }

  updateGame(updateHistory = true) {

  }

  undo() {
    if (this.canUndo()) {

    }
  }

  canUndo() {
    return this.state.history.size > 1;
  }

  solve() {
    let solved = game.solve(this.state.game);
    let rows = utils.partition(solved.get('cols'), solved.get('tiles'))
    this.setState({
      game: solved,
      rows: rows,
      history: this.state.history.push(solved)
    })
  }

  render() {
    return (
      <div className="container">
        <Board />
        <div className="row">
          <ul className={s.buttonList}>
            <li>
              <button className="waves-effect waves-light btn" onClick={this.startNewGame.bind(this)}>New Game</button>
            </li>
            <li><button className="waves-effect waves-light btn" onClick={this.toggleJsonShow.bind(this)}>Toggle JSON</button></li>
            <li><button className="waves-effect waves-light btn" onClick={this.undo.bind(this)} disabled={!this.canUndo()}>Undo</button></li>
            <li><button className="waves-effect waves-light btn" onClick={this.solve.bind(this)}>solve</button></li>
          </ul>
        </div>

      </div>
    );
  }

}

export default withStyles(s)(Sudoku);
