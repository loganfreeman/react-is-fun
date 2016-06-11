import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';
import * as utils from './utils';
import * as game from './SudokuGame';
import {List} from 'immutable';

import _ from 'underscore';

class Tile extends Component {
  static propTypes = {
    tile: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false
    }
  }

  getValue() {
    if (this.props.tile) {
      return this.props.tile.get('value')
    }
  }

  render() {
    return (
      <div className={s.tile}>
        <div className={s.lid} />
        <div>
          {this.getValue()}
        </div>
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

  static propTypes = {
    row: React.PropTypes.object
  }

  getTile(i) {
    if (this.props.row) {
      return this.props.row[i]
    }
  }

  render() {
    let tiles = _.range(9).map((i) => {
      return <Tile key={i} tile={this.getTile(i)} />
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

  static propTypes = {
    rows: React.PropTypes.object
  }

  render() {
    let rows = [], i =0;
    if (this.props.rows) {
      for(let row of this.props.rows) {
          rows.push(<Row row={row} key={i++}/>)
      }
    }


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
        <Board rows={this.state.rows} />
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
