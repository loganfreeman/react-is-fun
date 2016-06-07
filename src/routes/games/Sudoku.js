import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';

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
