import {
  List,
  Map,
  fromJS
} from 'immutable';

import * as algo from './SudokuAlgorithm';

import * as Utils from './utils';

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
    tiles: initTiles(rows, cols)
  });
}

function solve(game) {
  let board = game.get('tiles').toArray().map((tile: any, idx: number) => tile.get('value'));

  return fromJS({
    cols: 9,
    rows: 9,
    playingTime: 0,
    tiles: makeTiles(solvePuzzle(board))
  });
}

function getAllowed(game: any, pos: number) {
  var board: number[] = game.get('tiles').toArray().map((tile: any, idx: number) => tile.get('value'));

  return allowed(board, pos);
}

function setTile(game: any, tile: any, value: any) {
  const updated = !game.getIn(['tiles', tile]) ?
    game : game.setIn(['tiles', tile, 'value'], value);
  return updated;
}

function revealTile(game: any, tile: any) {
  const updated = !game.getIn(['tiles', tile]) ?
    game : game.setIn(['tiles', tile, 'isRevealed'], true);
  return updated;
}

function createGame(rows: number = 9, cols: number = 9) {
  return fromJS({
    cols: cols,
    rows: rows,
    playingTime: 0,
    tiles: initTiles(rows, cols)
  });
}
