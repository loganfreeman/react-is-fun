import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MineSweeper.css';
import * as Utils from './utils';
import classNames from 'classnames/bind';


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMine : props.cell.hasMine,
            hasFlag : props.cell.hasFlag,
            isOpened : props.cell.isOpened,
            count : 0
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpened : nextProps.cell.isOpened,
            hasMine : nextProps.cell.hasMine,
            hasFlag : nextProps.cell.hasFlag,
            count : nextProps.cell.count
        });
    }
    open() {
        this.props.open(this.props.cell);
    }
    mark(e) {
        e.preventDefault();
        if(!this.state.isOpened){
            this.props.mark(this.props.cell);
        }
    }
    render() {
        let _this = this;
        let cell = () => {
            if(_this.state.isOpened){
                if(_this.state.hasMine){
                    return (
                        <div className={s.Cell__cover, s['Cell__cover--opened']}>
                            <span className={s.Cell__bomb}>b</span>
                        </div>
                    );
                } else {
                    return (
                        <div className={s.Cell__cover, s['Cell__cover--opened']}>
                            <span className={s['Cell__number'+_this.state.count]}>{_this.state.count}</span>
                        </div>
                    );
                }
            } else if(_this.state.hasFlag){
                return (
                    <div className={s.Cell__cover, s['Cell__cover--opened']}>
                        <span className={s.Cell__flag}>f</span>
                    </div>
                );
            } else {
                return (
                    <div className={s.Cell__cover}></div>
                );
            }
        };
        return (
            <td className={s.Cell} onClick={this.open.bind(this)} onContextMenu={this.mark.bind(this)}>
                {cell()}
            </td>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells : props.cells
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cells : nextProps.cells
        });
    }
    render(){
        let Cells = this.state.cells.map((cell, index) => {
            return(
                <Cell key={index} cell={cell} open={this.props.open} mark={this.props.mark} />
            );
        });
        return (
            <tr>
                {Cells}
            </tr>
        );
    }
}


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows : this.createTable(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.openNum > nextProps.openNum || this.props.colNum !== nextProps.colNum){
            this.setState({
                rows : this.createTable(nextProps)
            });
        }

    }
    createTable(props) {
        let mineTable = [];
        for(let row = 0; row < props.rowNum; row++){
            mineTable.push([]);
            for(let col = 0; col < props.colNum; col++){
                mineTable[row].push({
                    x : col,
                    y : row,
                    count : 0,
                    isOpened : false,
                    hasMine : false,
                    hasFlag : false
                });
            }
        }
        for(let i = 0; i < props.mineNum; i++){
            let cell = mineTable[Math.floor(Math.random()*props.rowNum)][Math.floor(Math.random()*props.colNum)];
            if(cell.hasMine){
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        return mineTable;
    }
    open(cell) {
        let num = this.countMines(cell);
        let _rows = this.state.rows;
        if(!_rows[cell.y][cell.x].isOpened){
            this.props.addOpenNum();
        }
        _rows[cell.y][cell.x].isOpened = true;
        _rows[cell.y][cell.x].count = cell.hasMine ? "b" : num;
        this.setState({rows : _rows});
        if(_rows[cell.y][cell.x].hasFlag){
            _rows[cell.y][cell.x].hasFlag = false;
            this.props.checkFlagNum(-1);
        }
        if(!cell.hasMine && num === 0){
            this.openAround(cell);
        }
        if(cell.hasMine){
            this.props.gameOver();
        }
    }
    mark(cell) {
        let _rows = this.state.rows;
        let _cell = _rows[cell.y][cell.x];
        _cell.hasFlag = !_cell.hasFlag;
        this.setState({rows : _rows});
        this.props.checkFlagNum(_cell.hasFlag ? 1 : -1);
    }
    countMines(cell) {
        let aroundMinesNum = 0;
        for(let row = -1; row <= 1; row++){
            for(let col = -1; col <= 1; col++){
                if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.state.rows.length && cell.x-0 + col < this.state.rows[0].length && this.state.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !(row === 0 && col === 0)){
                    aroundMinesNum ++;
                }
            }
        }
        return aroundMinesNum;
    }
    openAround(cell){
        let _rows = this.state.rows;
        for(let row = -1; row <= 1; row++){
            for(let col = -1; col <= 1; col++){
                if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.state.rows.length && cell.x-0 + col < this.state.rows[0].length && !this.state.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !this.state.rows[cell.y-0 + row][cell.x-0 + col].isOpened){
                   this.open(_rows[cell.y-0 + row][cell.x-0 + col]);
                }
            }
        }
    }
    render() {
        let Rows = this.state.rows.map((row, index) => {
            return(
                <Row key={index} cells={row} open={this.open.bind(this)} mark={this.mark.bind(this)} />
            );
        });
        return(
            <table className={s.Table}>
                <tbody>
                    {Rows}
                </tbody>
            </table>
        );
    }
}

class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "hard",
            mineNum : 10,
            rowNum : 9,
            colNum : 9,
            flagNum : 0,
            openNum : 0,
            time : 0,
            status : "playing"   // playing, clear, gameover
        };
    }
    componentWillUpdate() {
        if(this.state.status === "playing"){
            this.judge();
        }
    }
    componentWillMount() {
        this.intervals = [];
    }
    componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval);
        }
    }

    tick() {
        if(this.state.openNum > 0 && this.state.status === "playing"){
            this.setState({time: this.state.time + 1});
        }
    }
    judge() {
        if(this.state.mineNum + this.state.openNum >= this.state.rowNum * this.state.colNum){
            this.setState({status: "clear"});
        }
    }
    gameOver() {
        this.setState({status: "gameover"});
    }
    checkFlagNum(update) {
        this.setState({flagNum: this.state.flagNum + update});
    }
    setMine(){
        let mineTable = this.state.mineTable;
        for(let i = 0; i < this.state.mineNum; i++){
            let cell = mineTable[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
            if(cell.hasMine){
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        this.setState({
            mineTable: mineTable
        });
    }
    addOpenNum() {
        if(this.state.openNum === 0){
            this.interval = setInterval(this.tick.bind(this), 1000);
        }
        this.setState({
            openNum : ++ this.state.openNum
        });
    }
    reset() {
        clearInterval(this.interval);
        this.setState({openNum: 0, flagNum: 0, time: 0, status: "playing"});
    }
    setEasy() {
        clearInterval(this.interval);
        this.setState({level: "easy", mineNum: 10, rowNum: 9, colNum: 9, openNum: 0, flagNum: 0, time: 0, status: "playing"});
    }
    setNormal() {
        clearInterval(this.interval);
        this.setState({level: "normal", mineNum: 40, rowNum: 16, colNum: 16, openNum: 0, flagNum: 0, time: 0, status: "playing"});
    }
    setHard() {
        clearInterval(this.interval);
        this.setState({level: "hard", mineNum: 100, rowNum: 16, colNum: 30, openNum: 0, flagNum: 0, time: 0, status: "playing"});
    }
    render() {
        let _this = this;
        var cx = classNames.bind(s);
        return (
            <div>
                <div className={s.MineSweeper}>
                    <span className={s.MineSweeper__flagNum}> {this.state.mineNum - this.state.flagNum}</span>
                    <span className={s['MineSweeper__face']} onClick={this.reset.bind(this)}>
                        <span className={cx(s.button, s[this.state.status])}></span>
                    </span>
                    <span className={s.MineSweeper__time}> {this.state.time}</span>
                    <Table openNum={this.state.openNum} mineNum={this.state.mineNum} rowNum={this.state.rowNum} colNum={this.state.colNum} gameOver={this.gameOver.bind(this)} addOpenNum={this.addOpenNum.bind(this)} checkFlagNum={this.checkFlagNum.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(MineSweeper);
