import * as game from './TetrisGame';
import {
  GridService,
  Piece,
  Coordinate
} from './TetrisGame';
import * as utils from './utils';
import {
  expect
} from 'chai';


describe('tetris game', () => {
  it('should convert coordinate to position', () => {
    let c = new Coordinate(4, 3);
    expect(game.coordToPosMem(c)).to.equal(34);
  })
})
