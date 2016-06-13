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
  it('should generate uid', () => {
    let id = game.generateUID();
    expect(typeof id).to.equal('string');
    expect(id.length).to.equal(36);
  })
  it('should get x and y in pixels', () => {
    let x = 4;
    let y = 10;
    expect(game.getX(x)).to.equal(110);
    expect(game.getY(y)).to.equal(250);
  })
  it('should get gridService', () => {
    let gridService = GridService.getSingleton();
    expect(Array.isArray(gridService.grid)).to.be.true;
    GridService.buildEmptyGameBoard();
    gridService.grid.forEach((piece) => {
      expect(piece.filled).to.be.false;
      expect(piece.shape).to.be.null;
      expect(piece.ghost).to.be.false;
    })
  })
  it('should update ghost piece', () => {
    let c = new Coordinate(4, 3);
    let gridService = GridService.getSingleton();
    GridService.updateGhostPiece(c);
    expect(GridService.getSingleton().grid[34].ghost).to.be.true;
    GridService.resetGhostPiece();
    gridService.grid.forEach((piece) => {
      expect(piece.ghost).to.be.false;
    })
  })
  it('should update current piece', () => {
    let c = new Coordinate(4, 3);
    let gridService = GridService.getSingleton();
    GridService.updateCurrentPiece(c, 3);
    let piece = GridService.getSingleton().grid[34];
    expect(piece.current).to.be.true;
    expect(piece.shape).to.equal(3);
    GridService.resetCurrentPiece();
    gridService.grid.forEach((piece) => {
      expect(piece.current).to.be.false;
    })
  })
})
