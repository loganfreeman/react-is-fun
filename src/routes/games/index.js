import React from 'react';
import Games from './Games';
export default {

  path: '/games',

  action() {
    let menus = [{
      text: 'Sudoku',
      key: 'sudoku'
    }, {
      text: 'Tetris',
      key: 'tetris'
    }, {
      text: 'MineSweeper',
      key: 'minesweeper'
    }];
    return <Games title="Games" menus={menus}/>;
  },

};
