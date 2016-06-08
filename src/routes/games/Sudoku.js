import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';
import * as Utils from './utils';

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

  constructor() {
    super();
    this.state = {
      showJson: false
    }
  }

  startNewGame() {
    console.log('new game')
  }

  toggleJsonShow() {
    console.log('toggle json show');
    this.setState({
      showJson: !this.state.showJson
    })
  }

  undo() {
    console.log('undo')
  }

  solve() {
    console.log('solve puzzle')
  }

  render() {
    return (
      <div className="container">
        <Board />
        <div className="row">
          <ul className={s.buttonList}>
            <li>
              <a className="waves-effect waves-light btn" onClick={this.startNewGame.bind(this)}>New Game</a>
            </li>
            <li><a className="waves-effect waves-light btn" onClick={this.toggleJsonShow.bind(this)}>Toggle JSON</a></li>
            <li><a className="waves-effect waves-light btn" onClick={this.undo.bind(this)}>Undo</a></li>
            <li><a className="waves-effect waves-light btn" onClick={this.solve.bind(this)}>solve</a></li>
          </ul>
        </div>

      </div>
    );
  }

}

export default withStyles(s)(Sudoku);
