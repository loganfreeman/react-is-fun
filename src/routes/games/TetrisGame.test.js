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
  it('should convert position to coordinate', () => {
    let p = 34;
    let c = new Coordinate(4, 3);
    expect(game.posToCoord(p).equals(c)).to.be.true;
  })
  it('should within grid', () => {
    let c = new Coordinate(4, 3);
    expect(game.withinGridMem(c)).to.be.true;
    c = new Coordinate(4, 20);
    expect(game.withinGridMem(c)).to.be.false;
    c = new Coordinate(10, 19);
    expect(game.withinGridMem(c)).to.be.false;
  })
})
