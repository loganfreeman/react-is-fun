/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tetris.css';
import classNames from 'classnames/bind';
import {List, ListItem} from 'material-ui/List';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import EditorSpaceBar from 'material-ui/svg-icons/editor/space-bar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvStop from  'material-ui/svg-icons/av/stop';
import HardwareGamepad from  'material-ui/svg-icons/hardware/gamepad';
import * as game from './TetrisGame';
import _ from 'underscore';
import {
  GridService,
  Piece,
  Coordinate,
  getBoardWidth,
  GameData
} from './TetrisGame';
class Tetris extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      grid: GridService.getSingleton().grid,
      pieces: _.range(16),
    })
  }

  componentDidMount() {
    this.gameOn();
  }

  componentWillUnmount() {
    this.gameOver();
  }

  gameOn() {
    window.requestAnimationFrame(() => this.gameOn()); // use arrow functions to lexically capture this
    if(!this.isGamePause() && this.isGameStart()) {
        this.loop();
    }
  }

  loop = _.throttle(this.gameLoop, this.getGameSpeed(), {
      leading: false,
      trailing: false
  })

  gameLoop() {
    this.moveCurrentPiece();
    this.updateCurrentPiece();
    this.updateGhostPiece();
    this.setState({
      grid: GridService.getSingleton().grid,
      currentPiece: this.currentPiece
    })
    console.log('Game loops');
  }

  moveCurrentPiece() {
    var speedY = this.getPositionY() + 1;
    this.currentPiece.updatePosition({
        y: speedY
    }, () => this.insertAndClearRow());
  }

  updateCurrentPiece() {
    if(this.currentPiece) {
      this.currentPiece.updateCurrentPiece();
    }
  }

  insertAndClearRow() {
    this.insertPiece();
    GridService.checkAndClearFilledRow(function() {
        GameData.score += 100;
    });
  }

  insertPiece() {
    GridService.insertPiece(this.currentPiece, () => this.gameOver());
    this.currentPiece.destroy();
    this.currentPiece = null;
    this.createNewPiece();
  }

  updateGhostPiece() {
    if (this.currentPiece) {
        this.currentPiece.updateGhostPiece();
    }
  }

  startGame() {
    GridService.buildEmptyGameBoard();
    this.createNewPiece();
    this.setState({
      grid: GridService.getSingleton().grid,
      currentPiece: this.currentPiece,
      isPause: false,
      isStart: true
    })
  }
  resetGame() {
    GridService.buildEmptyGameBoard();
  }

  createNewPiece() {
    this.currentPiece = new Piece({
        x: 4,
        y: 0
    });
    let collisionPoint = this.currentPiece.calculateCollisionPoint();
    if(collisionPoint.y <= this.currentPiece.PositionY) {
      this.gameOver();
      this.currentPiece = null;
    }
  }


  getGameSpeed() {
    return GameData.getGameSpeed();
  }

  isGamePause() {
    return this.state.isPause;
  }

  isGameStart() {
    return this.state.isStart;
  }

  setGamePause(pause) {
    this.setState({
      isPause: pause
    })
  }

  setGameStart(start) {
    this.setState({
      isStart: start
    })
  }

  gameOver() {
    this.setGameStart(false);
  }

  getPositionX() {
      return this.currentPiece.PositionX;
  }

  getPositionY() {
      return this.currentPiece.PositionY;
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  getFilledCustomColor(cell) {
    if (cell.filled && cell.shape === 7) {
        return {
            'backgroundColor': GameData.getColor()
        };
    }else {
      return {};
    }
  }

  getFilledClass(cell) {
    var pieceClass = ['dy-grid-cell'];
    if (cell.filled || cell.current) {
        switch(cell.shape) {
            case 0: pieceClass.push('dy-L-filled');
                break;
            case 1: pieceClass.push('dy-O-filled');
                break;
            case 2: pieceClass.push('dy-I-filled');
                break;
            case 3: pieceClass.push('dy-T-filled');
                break;
            case 4: pieceClass.push('dy-J-filled');
                break;
            case 5: pieceClass.push('dy-S-filled');
                break;
            case 6: pieceClass.push('dy-Z-filled');
                break;
            default: pieceClass.push('dy-X-filled');
                break;
        }
    }
    if (cell.ghost) {
        if (pieceClass.length > 0) {
          pieceClass.push('dy-ghost-piece')
        }else {
          pieceClass.push('dy-ghost-piece')
        }
    }
    return pieceClass;
  }



  render() {
    let cx = classNames.bind(s);
    let cells = this.state.grid.map((cell, i) => {
      let styles = this.getFilledCustomColor(cell);
      let pieceClasses = this.getFilledClass(cell).map((c) => {
        return s[c];
      })
      return (
        <div style={styles} key={i} className={cx(pieceClasses)}/>
      )
    })
    let pauseText = this.state.isPause ? 'Resume' : 'Pause';

    let pauseIcon = this.state.isPause ? <AvPause /> : <AvPlayArrow />
    return (
      <div className="flexbox-container">
        <div>
          <div className={cx(s['dy-game-board'])}>
            <div className={cx(s['dy-grid-container'])}>
              {cells}
            </div>
          </div>
          <div>
            <div>
              <FlatButton
                onClick={() => this.startGame()}
                label="New Game"
                icon={<HardwareGamepad />}
              />
              <FlatButton
                onClick={() => this.setGamePause(!this.state.isPause)}
                label={pauseText}
                icon={pauseIcon}
              />
              <FlatButton
                onClick={() => this.gameOver()}
                label="Stop"
                icon={<AvStop />}
              />
            </div>
          </div>
        </div>
        <div>
          <h1>Instructions</h1>
          <List>
            <ListItem primaryText="Move to the right" rightIcon={<NavigationArrowForward />} />
            <ListItem primaryText="Rotate left" rightIcon={<NavigationArrowDownward />} />
            <ListItem primaryText="Rotate right" rightIcon={<NavigationArrowUpward />} />
            <ListItem primaryText="Move to the left" rightIcon={<NavigationArrowBack />} />
            <ListItem primaryText="All the way to the bottom" rightIcon={<EditorSpaceBar />} />
          </List>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Tetris);
