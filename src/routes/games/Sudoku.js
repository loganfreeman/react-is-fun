import React, {
  Component,
  PropTypes
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';
import * as utils from './utils';
import * as game from './SudokuGame';
import {
  List
} from 'immutable';

import _ from 'underscore';

class Tile extends Component {
  static propTypes = {
    tile: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false
    }
  }

  getValue() {
    if (this.props.tile) {
      return this.props.tile.get('value')
    }
  }

  handleClick(event) {
    // console.log(this.props.tile.toJS());
    let e = new CustomEvent('tileClick', {
      detail: this.props.tile
    });
    document.dispatchEvent(e);

  }

  render() {
    return ( < div className = {
        s.tile
      }
      onClick = {
        this.handleClick.bind(this)
      }
      ref = {
        (c) => this.element = c
      } >
      < div > {
        this.getValue()
      } < /div> < /div>
    )
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {
    row: React.PropTypes.object.isRequired
  }

  render() {
    let tiles = [],
      i = 0;
    for (let tile of this.props.row) {
      tiles.push( < Tile key = {
          i++
        }
        tile = {
          tile
        }
        />)
      }
      return ( < div className = {
        s.row
      } > {
        tiles
      } < /div>)
    }
  }

  class Board extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }

    static propTypes = {
      rows: React.PropTypes.object
    }

    render() {
      let rows = [],
        i = 0;
      if (this.props.rows) {
        for (let row of this.props.rows) {
          rows.push( < Row row = {
              row
            }
            key = {
              i++
            }
            />)
          }
        }


        return ( < div className = {
          s.board
        } > {
          rows
        } < /div>)
      }
    }

    class Sudoku extends Component {

      constructor(props) {
        super(props);
        this.state = {
          showJson: false,
          history: List()
        }
      }

      handleTileClick(event) {
        let g = game.revealTile(this.state.game, event.detail.get('id'));
        this.updateGame(g);
      }

      boundTileClick = this.handleTileClick.bind(this);

      componentDidMount() {
        console.log('add event listener', 'tileClick');
        document.addEventListener('tileClick', this.boundTileClick)
      }

      componentWillUnmount() {
        console.log('remove event listener', 'tileClick');
        document.removeEventListener('tileClick', this.boundTileClick)
      }

      updateGame(newGame, updateHistory = true) {
        let rows = utils.partition(newGame.get('cols'), newGame.get('tiles'));
        this.setState({
          game: newGame,
          rows: rows,
          history: updateHistory ? this.state.history.push(newGame) : this.state.history,
          json: JSON.stringify(newGame.get('tiles').toJS())
        })
      }

      startNewGame() {
        let newGame = game.createGame();
        this.updateGame(newGame);
      }

      revealTiles() {

      }

      undo() {
        if (this.canUndo()) {

        }
      }

      canUndo() {
        return this.state.history.size > 1;
      }

      solve() {
        let solved = game.solve(this.state.game);
        let rows = utils.partition(solved.get('cols'), solved.get('tiles'))
        this.setState({
          game: solved,
          rows: rows,
          history: this.state.history.push(solved)
        })
      }

      render() {
        return ( <div className = "container"
          ref = {
            (c) => this.container = c
          } >
          <div className="row"><Board rows = {this.state.rows} /></div>
          <div className = "row" >
          <ul className = {
            s.buttonList
          }>
          <li>
          <button className = "waves-effect waves-light btn"
          onClick = {
            this.startNewGame.bind(this)
          } > New Game < /button> < /li> < li > < button className = "waves-effect waves-light btn"
          onClick = {
            this.revealTiles.bind(this)
          } > Reveal tiles < /button></li >
          < li > < button className = "waves-effect waves-light btn"
          onClick = {
            this.undo.bind(this)
          }
          disabled = {!this.canUndo()
          } > Undo < /button></li >
          <li> <button className = "waves-effect waves-light btn"
          onClick = {
            this.solve.bind(this)
          } > solve </button></li>
          </ul> </div>
          </div>

        );
      }

    }

    export default withStyles(s)(Sudoku);
