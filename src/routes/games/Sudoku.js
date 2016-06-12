import React, {
  Component,
  PropTypes
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sudoku.css';
import * as utils from './utils';
import * as game from './SudokuGame';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  List
} from 'immutable';

import _ from 'underscore';
import classNames from 'classnames/bind';

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
    let cx = classNames.bind(s);
    let className;
    if(this.props.tile.get('changed')) {
      className = cx(s.changed);
    }
    return ( < div className = {
        s.tile
      }
      onClick = {
        this.handleClick.bind(this)
      }
      ref = {
        (c) => this.element = c
      } >
      < div className={className}> {
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
          history: List(),
          open: false,
          alertOpen: false
        }
      }

      handleTileClick(event) {
        let tile = event.detail;
        if (!tile.get('value')){
          this.setState({
            selectedTile: tile
          })
          this.handleOpen();
        }

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

      undo() {
        if (this.canUndo()) {
          let history = this.state.history.pop();
          let game = history.last();
          let rows = utils.partition(game.get('cols'), game.get('tiles'));
          this.setState({
            game: game,
            rows: rows,
            history: history
          })
        }
      }

      canUndo() {
        return this.state.history.size > 1;
      }

      solve() {
        let solved = game.solve(this.state.game);
        if(solved) {
          let rows = utils.partition(solved.get('cols'), solved.get('tiles'))
          this.setState({
            game: solved,
            rows: rows,
            history: this.state.history.push(solved)
          })
        }else {
          this.setState({
            alertOpen: true
          })
        }

      }

      handleOpen = () => {
        this.setState({open: true});
      };

      closeDialog() {
        this.setState({
          open: false,
          selectedCell: undefined
        });
      }

      handleClose = (cancel) => {
        if (cancel) {
          this.closeDialog()
        }
        let allowed = game.getAllowed(this.state.game, this.state.selectedTile.get('id'));
        if(_.contains(allowed, this.state.selectedCell)){
          let newGame = game.setTile(this.state.game, this.state.selectedTile.get('id'), this.state.selectedCell);
          this.updateGame(newGame);
          this.closeDialog();

        }

      };

      handleDialogTileClick(value) {
        console.log(value);
        this.setState({
          selectedCell: value
        })
      }

      render() {
        let cx = classNames.bind(s);

        const actions = [
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose.bind(this, true)}
              />,
              <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose.bind(this, false)}
              />,
            ];

            const alertActions = [
                  <FlatButton
                    label="Cancel"
                    primary={true}
                    onClick={() => {this.setState({alertOpen: false})}}
                  />
                ];



        const getDialogContent = () => {
          return _.range(3).map((i) => {
            let r = i * 3;
            let cells = [1, 2, 3].map((c) => {
              let active = (c+r === this.state.selectedCell);
              let className = cx(s.tile, { active: active});
              return <div className={className} onClick={this.handleDialogTileClick.bind(this, c + r)} key={c}>{c + r}</div>
            })
            return (
                <div key={i} className={s.row}>{cells}</div>
            )

          })
        }

        const dialogContent = getDialogContent();

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
          } > New Game < /button> < /li>
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
          <Dialog
                    title="Select a number"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                  >
                    <div className={s.board}>
                      {dialogContent}
                    </div>
                  </Dialog>
          <Dialog
                    title="Alert Dialog"
                    actions={alertActions}
                    modal={false}
                    open={this.state.alertOpen}
                    onRequestClose={() => {this.setState({alertOpen: false})}}
                  >
                    Cannot solve the puzzle!
                  </Dialog>
          </div>

        );
      }

    }

    export default withStyles(s)(Sudoku);
