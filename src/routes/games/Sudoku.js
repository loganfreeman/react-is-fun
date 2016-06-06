import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';

class Sudoku extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Sudoku</h1>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Sudoku);
