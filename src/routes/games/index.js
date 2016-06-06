import React from 'react';
import Games from './Games';
export default {

  path: '/games',

  action() {
    let menus = [{
      text: 'Sudoku',
      key: 'sudoku-game'
    }, {
      text: 'Tetris',
      key: 'tetris-game'
    }];
    return <Games title="Games" menus={menus}/>;
  },

};
