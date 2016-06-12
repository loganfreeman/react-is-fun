import {
  List,
  Map,
  fromJS
} from 'immutable';

import * as algo from './SudokuAlgorithm';

import * as utils from './utils';

export {initTiles, createGame, solve, getAllowed, setTile, revealTile}

function makeTiles(board) {
  return board.map((value, idx) => {
    let tile = Map({
      isRevealed: value !== null
    });
    tile = tile.set('id', idx);
    tile = tile.set('value', value);
    return tile;
  })
}

function initTiles() {
  let board = algo.makeSudoku();
  return makeTiles(board);
}

function createGame() {
  return fromJS({
    cols: 9,
    rows: 9,
    playingTime: 0,
    tiles: initTiles()
  });
}

function solve(game) {
  let board = game.get('tiles').toArray().map((tile: any, idx: number) => tile.get('value'));

  return fromJS({
    cols: 9,
    rows: 9,
    playingTime: 0,
    tiles: makeTiles(algo.solvePuzzle(board))
  });
}

function getAllowed(game, pos) {
  var board: number[] = game.get('tiles').toArray().map((tile, idx) => tile.get('value'));

  return algo.allowed(board, pos);
}

function setTile(game, tile, value) {
  const updated = !game.getIn(['tiles', tile]) ?
    game : game.setIn(['tiles', tile, 'value'], value);
  return updated;
}

function revealTile(game, tile) {
  const updated = !game.getIn(['tiles', tile]) ?
    game : game.setIn(['tiles', tile, 'isRevealed'], true);
  return updated;
}
