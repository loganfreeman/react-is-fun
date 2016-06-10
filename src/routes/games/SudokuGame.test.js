import * as game from './SudokuGame';
import * as utils from './utils';
import {
  expect
} from 'chai';

describe('sudoku game', () => {
  it('should init tiles', () => {
    let board = game.initTiles();
  })
  it('should create game', () => {
    let newGame = game.createGame()
  })
  it('should solve game', () => {
    let newGame = game.createGame()
    let solved = game.solve(newGame)
  })
  it('should get allowed', () => {
    let newGame = game.createGame()
    let solved = game.solve(newGame)
    let allowed = game.getAllowed(solved, 80);
    expect(allowed).to.deep.equal([]);
  })
})
