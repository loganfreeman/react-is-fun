import * as game from './TetrisGame';
import {
  GridService,
  Piece,
  Coordinate,
  getBoardWidth,
  GameData
} from './TetrisGame';
import * as utils from './utils';
import {
  expect
} from 'chai';

import * as sinon from 'sinon';


describe('tetris game', () => {
  let pos = new Coordinate(4, 10);
  let piece = new Piece(pos);
  let level = 18;
  let grid = GridService.getSingleton().grid;
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
  it('should move piece down one level', () => {
    for(let j = 0; j < getBoardWidth(); j++) {
      let curPos = game.coordToPosMem({x: j, y: level-1});
      grid[curPos].filled = true;
      grid[curPos].shape = piece.getShape();
    }
    GridService.movePieceDownLevel(level);
    for(let j = 0; j < getBoardWidth(); j++) {
      let curPos = game.coordToPosMem({x: j, y: level-1});
      expect(grid[curPos].filled).to.equal(false);
      expect(grid[curPos].shape).to.equal(null);
    }
    GridService.buildEmptyGameBoard();
  })
  it('should clear nth row', () => {
    for(let j = 0; j < getBoardWidth(); j++) {
      let curPos = game.coordToPosMem({x: j, y: level});
      grid[curPos].filled = true;
      grid[curPos].shape = piece.getShape();
    }
    GridService.clearNthRow(level);
    for(let j = 0; j < getBoardWidth(); j++) {
      let curPos = game.coordToPosMem({x: j, y: level});
      expect(grid[curPos].filled).to.equal(false);
      expect(grid[curPos].shape).to.equal(null);
    }
  })
  it('should check and clear filled row', () => {
    for(var j = 0; j < getBoardWidth(); j++) {
      var curPos = game.coordToPosMem({x: j, y: level-1});
      grid[curPos].filled = true;
      grid[curPos].shape = piece.getShape();
    }
    let that = {
      'checkAndClearFilledRowCallback': () => GameData.score += 100
    };
    let fn = sinon.spy(that, 'checkAndClearFilledRowCallback');
    GridService.checkAndClearFilledRow(fn);
    expect(that['checkAndClearFilledRowCallback'].calledOnce).to.be.true;
    expect(GameData.score).to.equal(100);
    for(var j = 0; j < getBoardWidth(); j++) {
      var curPos = game.coordToPosMem({x: j, y: level-1});
      expect(grid[curPos].filled).to.equal(false);
      expect(grid[curPos].shape).to.equal(null);
    }
    GridService.buildEmptyGameBoard();
    GameData.score = 0;
  })
  it('should update position', () => {
    let newPos = { y: pos.y + 1};
    let fn = sinon.spy();
    sinon.spy(piece, 'verifyPiece');
    piece.updatePosition(newPos, fn);
    expect(piece.verifyPiece.calledWith({x: pos.x, y: newPos.y})).to.be.true;
    expect(fn.calledOnce).not.be.true;
    expect(piece.PositionX).to.equal(pos.x);
    expect(piece.PositionY).to.equal(newPos.y);
    piece.verifyPiece.restore();
  })
  it('should update position and call callback if collision happens', () => {
    let cell = piece.calculateCollisionPoint();
    let newPos = {x : cell.x, y: cell.y + 1};
    let oldPos = piece.Coord;
    expect(piece.verifyPiece(cell)).to.equal(true);
    expect(piece.verifyPiece(newPos)).to.equal(false);
    let fn = sinon.spy();
    sinon.spy(piece, 'verifyPiece');
    piece.updatePosition(newPos, fn);
    expect(fn.calledOnce).be.true;
    expect(piece.PositionX).to.equal(oldPos.x);
    expect(piece.PositionY).to.equal(oldPos.y);
    piece.verifyPiece.restore();
  })
  it('should calculate collision point', () => {
    sinon.spy(piece, 'verifyPiece');
    let cell = piece.calculateCollisionPoint();
    expect(piece.verifyPiece(cell)).to.equal(true);
    expect(piece.verifyPiece({x : cell.x, y: cell.y + 1})).to.equal(false);
    piece.verifyPiece.restore();
  })
  it('should rotate piece', () => {
    let oldRotation = piece.rotation;
    sinon.spy(piece, 'verifyPiece');
    piece.rotatePiece();
    expect(piece.verifyPiece.calledOnce).to.be.true;
    expect(piece.rotation).to.equal((oldRotation + 1) % GameData.rotationLimit)
    piece.verifyPiece.restore();
  })
  it('should update ghost piece', () => {
    piece.updateGhostPiece();
    let cell = piece.calculateCollisionPoint();
    let coord = piece.convertPatternToCoordinates(cell);
    for(var i = 0, len = coord.length; i < len; i++) {
        let pos = game.coordToPosMem(coord[i]);
        expect(grid[pos].ghost).to.equal(true);
    }
  })
  it('should update current piece', () => {
    piece.updateCurrentPiece();
    let shape = piece.getShape();
    let coord = piece.convertPatternToCoordinates();
    for(var i = 0, len = coord.length; i < len; i++) {
      let pos = game.coordToPosMem(coord[i]);
      expect(grid[pos].current).to.equal(true);
      expect(grid[pos].shape).to.equal(shape);
    }
  })
  it('should test within grid', () => {
    let truth = game.withinGridMem(piece.Coord);
    expect(truth).to.be.true;
  })
})
