import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"
import { Left, Right, Up, Down } from "./domino/halfDomino.jsx";

const PlayerInitialDominoesCount = 6;

export const Empty = -1;
export const Separator = -2;

let AllDominoes = {
    0:  { dot: 0,  direction: Left }, 1:  { dot: 1,  direction: Left }, 2:  { dot: 2,  direction: Left }, 3:  { dot: 3,  direction: Left }, 4:  { dot: 4,  direction: Left }, 5:  { dot: 5,  direction: Left }, 6:  { dot: 6,  direction: Left },
    11: { dot: 11, direction: Left }, 12: { dot: 12, direction: Left }, 13: { dot: 13, direction: Left }, 14: { dot: 14, direction: Left }, 15: { dot: 15, direction: Left }, 16: { dot: 16 , direction: Left },
    22: { dot: 22, direction: Left }, 23: { dot: 23, direction: Left }, 24: { dot: 24, direction: Left }, 25: { dot: 25, direction: Left }, 26: { dot: 26, direction: Left },
    33: { dot: 33, direction: Left }, 34: { dot: 34, direction: Left }, 35: { dot: 35, direction: Left }, 36: { dot: 36, direction: Left },
    44: { dot: 44, direction: Left }, 45: { dot: 45, direction: Left }, 46: { dot: 46, direction: Left },
    55: { dot: 55, direction: Left }, 56: { dot: 56, direction: Left },
    66: { dot: 66, direction: Left }
};

class Game extends Component {
    constructor(props) {
        super(props);
        const randomPlayer1Dominoes = Game.getRandomPlayer1Dominoes();
        const num_rows = 9;
        const num_cols = 9;
        let board = new Array(num_rows);
        for (let i = 0; i < num_rows; i++) {
            board[i] = new Array(num_cols);
            for (let j = 0; j < num_cols; j++) {
                board[i][j] = { dot: Empty };
            }
        }
        this.state = {
            player1Deck: Object.keys(AllDominoes).filter((k) => randomPlayer1Dominoes.includes(k)),
            bank: Object.keys(AllDominoes).filter((k) => !randomPlayer1Dominoes.includes(k)),
            board: board,
            playsCount: 0,
            num_rows: 9,
            num_cols: 9,
            valid_placements: []
        };
        this.getData = this.getData.bind(this);
        this.getDrag = this.getDrag.bind(this);
    }

    getData(val) {
        AllDominoes[val.dot].direction = val.direction;
    }

    getDrag(val) {
        this.setState({
            board: this.state.board,
            bank: this.state.bank,
            playsCount: this.state.playsCount,
            num_rows: this.state.num_rows,
            num_cols: this.state.num_cols,
            valid_placements: val ? this.getValidPlacements(AllDominoes[val]) : []
        });
    }

    static getRandomPlayer1Dominoes() {
        const randomPlayer1Dominoes = [];
        const keys = Object.keys(AllDominoes);
        while (randomPlayer1Dominoes.length < PlayerInitialDominoesCount) {
            const randDomino = keys[Math.floor(Math.random() * keys.length)];
            if (!randomPlayer1Dominoes.includes(randDomino)) {
                randomPlayer1Dominoes.push(randDomino);
            }
        }
        return randomPlayer1Dominoes;
    }

    static onDragOver(ev) {
        return (ev.preventDefault());
    }

    getValidPlacements(domino) {
        let validPlacements = [];
        for (let i = 0; i < this.state.board.length; i++) {
            for (let j = 0; j < this.state.board[i].length; j++) {
                const placement = { x: i, y: j };
                if (this.isValidPlacement(domino, placement)) {
                    validPlacements.push(placement.x + ',' + placement.y);
                }
            }
        }
        return validPlacements;
    }

    isValidPlacement(domino, placement) {
        const x = parseInt(placement.x);
        const y = parseInt(placement.y);
        const num_rows = this.state.board.length;
        const num_cols = this.state.board[0].length;
        if (this.state.playsCount === 0) {
            return x < num_rows - 1 && x > 0 && y < num_cols - 1 && y > 0;
        }
        let dots1 = Math.floor(domino.dot / 10);
        let dots2 = Math.floor(domino.dot % 10);
        if (domino.direction === Left || domino.direction === Right) {
            //if already occupied
            if (this.state.board[x][y].dot !== Empty || this.state.board[x][Math.max(0, y - 1)].dot !== Empty || this.state.board[x][Math.min(num_cols - 1, y + 1)].dot !== Empty) {
                return false;
            }
            if (domino.direction === Right) {
                const temp = dots1;
                dots1 = dots2;
                dots2 = temp;
            }
            //to the right normal
            if (y >= 2 && y < num_cols - 1 && (this.state.board[x][y - 2].direction === Left || this.state.board[x][y - 2].direction === Right) && (this.state.board[x][y - 2].dot === dots1 || dots1 === 0 || this.state.board[x][y - 2].dot === 0)) {
                return true;
            }
            //to the right separator
            if (y >= 2 && x >= 1 && x < num_rows - 1 && (this.state.board[x][y - 2].direction === Up || this.state.board[x][y - 2].direction === Down) && this.state.board[x][y - 2].dot === Separator && this.state.board[x - 1][y - 2].dot === this.state.board[x + 1][y - 2].dot && (this.state.board[x + 1][y - 2].dot === 0 || dots1 === 0 || this.state.board[x + 1][y - 2].dot === dots1)) {
                return true;
            }
            //to the left normal
            if (y > 0 && y < num_cols - 2 && (this.state.board[x][y + 2].direction === Left || this.state.board[x][y + 2].direction === Right) && (this.state.board[x][y + 2].dot === dots2 || dots2 === 0 || this.state.board[x][y + 2].dot === 0)) {
                return true;
            }
            //to the left separator
            if (y < num_cols - 2 && x >= 1 && x < num_rows - 1 && (this.state.board[x][y + 2].direction === Up || this.state.board[x][y + 2].direction === Down) && this.state.board[x][y + 2].dot === Separator && this.state.board[x - 1][y + 2].dot === this.state.board[x + 1][y + 2].dot && (this.state.board[x + 1][y + 2].dot === 0 || dots2 === 0 || this.state.board[x + 1][y + 2].dot === dots2)) {
                return true;
            }
        } else {
            //if already occupied
            if (this.state.board[x][y].dot !== Empty || this.state.board[Math.max(0, x - 1)][y].dot !== Empty || this.state.board[Math.min(num_rows - 1, x + 1)][y].dot !== Empty) {
                return false;
            }
            if (domino.direction === Down) {
                const temp = dots1;
                dots1 = dots2;
                dots2 = temp;
            }
            //below normal
            if (x >= 2 && x < num_rows - 1 && (this.state.board[x - 2][y].direction === Up || this.state.board[x - 2][y].direction === Down) && (this.state.board[x - 2][y].dot === dots1 || dots1 === 0 || this.state.board[x - 2][y].dot === 0)) {
                return true;
            }
            //below separator
            if (x >= 2 && y >= 1 && y < num_cols - 1 && (this.state.board[x - 2][y].direction === Left || this.state.board[x - 2][y].direction === Right) && this.state.board[x - 2][y].dot === Separator && this.state.board[x - 2][y - 1].dot === this.state.board[x - 2][y + 1].dot && (this.state.board[x - 2][y + 1].dot === 0 || dots1 === 0 || this.state.board[x - 2][y + 1].dot === dots1)) {
                return true;
            }
            //above normal
            if (x < num_rows - 2 && x > 0 && (this.state.board[x + 2][y].direction === Up || this.state.board[x + 2][y].direction === Down) && (this.state.board[x + 2][y].dot === dots2 || dots2 === 0 || this.state.board[x + 2][y].dot === 0)) {
                return true;
            }
            //above separator
            if (x < num_rows - 2 && y >= 1 && y < num_cols - 1 && (this.state.board[x + 2][y].direction === Left || this.state.board[x + 2][y].direction === Right) && this.state.board[x + 2][y].dot === Separator && this.state.board[x + 2][y - 1].dot === this.state.board[x + 2][y + 1].dot && (this.state.board[x + 2][y + 1].dot === 0 || dots2 === 0 || this.state.board[x + 2][y + 1].dot === dots2)) {
                return true;
            }
        }
        return false;
    }

    static getDominoByPlacement(placement) {
        const keys = Object.keys(AllDominoes);
        for (let i = 0; i < keys.length; i++) {
            if (JSON.stringify(AllDominoes[keys[i]].placement) === JSON.stringify(placement)) {
                return AllDominoes[keys[i]];
            }
        }
    }

    onDrop(ev) {
        ev.preventDefault();
        if (ev.target.id) {
            const placement = { 'x': parseInt(ev.target.id.split(',')[0]), 'y': parseInt(ev.target.id.split(',')[1]) };
            const idDropped = parseInt(ev.dataTransfer.getData('id'));
            if (!this.isValidPlacement(AllDominoes[idDropped], placement)) {
                return;
            }
            const domino = AllDominoes[idDropped];
            AllDominoes[idDropped].placement = placement;
            let boardCopy = this.state.board;
            let dots1;
            let dots2;
            if (domino.direction === Left || domino.direction === Up) {
                dots1 = Math.floor(domino.dot / 10);
                dots2 = Math.floor(domino.dot % 10);
            } else {
                dots1 = Math.floor(domino.dot % 10);
                dots2 = Math.floor(domino.dot / 10);
            }
            if (domino.direction === Left || domino.direction === Right) {
                boardCopy[placement.x][placement.y - 1].dot = dots1;
                boardCopy[placement.x][placement.y - 1].direction = domino.direction;
                boardCopy[placement.x][placement.y].dot = Separator;
                boardCopy[placement.x][placement.y].direction = domino.direction;
                boardCopy[placement.x][placement.y + 1].dot = dots2;
                boardCopy[placement.x][placement.y + 1].direction = domino.direction;
            } else {
                boardCopy[placement.x - 1][placement.y].dot = dots1;
                boardCopy[placement.x - 1][placement.y].direction = domino.direction;;
                boardCopy[placement.x][placement.y].dot = Separator;
                boardCopy[placement.x][placement.y].direction = domino.direction;;
                boardCopy[placement.x + 1][placement.y].dot = dots2;
                boardCopy[placement.x + 1][placement.y].direction = domino.direction;;
            }
            //TODO - solve resizing bug
            // this.getRowsColsNumber(boardCopy);
            this.setState({
                player1Deck: this.state.player1Deck.filter((k) => { return k !== idDropped.toString() }),
                board: boardCopy,
                bank: this.state.bank,
                playsCount: this.state.playsCount + 1,
                num_rows: this.state.num_rows,
                num_cols: this.state.num_cols,
                valid_placements: []
            });
        }
    }

    static onReset() {
        return location.reload();
    }

    getEndResult() {
        if (this.state.player1Deck.length === 0) {
            return "Player wins!";
        } else {
            if (this.state.bank.length === 0) {
                return "Player loses!"
            }
        }
    }

    getBankDomino() {
        const randBankDomino = this.state.bank[Math.floor(Math.random() * this.state.bank.length)];
        let player1DeckCopy = this.state.player1Deck.concat(randBankDomino);
        this.setState({
            player1Deck: player1DeckCopy,
            bank: this.state.bank.filter((k) => k !== randBankDomino),
            board: this.state.board,
            playsCount: this.state.playsCount,
            num_rows: this.state.num_rows,
            num_cols: this.state.num_cols,
            valid_placements: this.state.valid_placements
        });
    }

    getRowsColsNumber(boardCopy) {
        if (boardCopy.length === 1) {
            let domino = AllDominoes[boardCopy[0]];
            domino.placement.x++;
            domino.placement.y++;
            this.state.num_rows += 2;
            this.state.num_cols += 2;
            return;
        }
        const placementToDominoes = {};
        for (let i = 0; i < boardCopy.length; i++) {
            const domino = AllDominoes[boardCopy[i]];
            placementToDominoes[domino.placement.y + ',' + domino.placement.x] = domino;
        }
        const retvalue = Game.getMinMaxPlacementLocations(placementToDominoes);
        const min_row = retvalue.min_row;
        const min_col = retvalue.min_col;
        const max_row = retvalue.max_row;
        const max_col = retvalue.max_col;
        if (parseInt(min_row) === 1) {
            this.state.num_rows++;
            for (let i = 0; i < boardCopy.length; i++) {
                let domino = AllDominoes[boardCopy[i]];
                domino.placement.y++;
            }
        }
        if (parseInt(min_col) === 1) {
            this.state.num_cols++;
            for (let i = 0; i < boardCopy.length; i++) {
                let domino = AllDominoes[boardCopy[i]];
                domino.placement.x++;
            }
        }
        if (parseInt(max_row) === this.state.num_rows) {
            this.state.num_rows++;
        }
        if (parseInt(max_col) === this.state.num_cols) {
            this.state.num_cols++;
        }
    }

    static getMinMaxPlacementLocations(placementToDominoes) {
        const keys = Object.keys(placementToDominoes);
        if (keys.length <= 1) {
            return { 'min_row': 1, 'min_col': 1, 'max_row': 1, 'max_col': 1 };
        }
        let min_row = Number.MAX_SAFE_INTEGER;
        let min_col = Number.MAX_SAFE_INTEGER;
        let max_row = Number.MIN_SAFE_INTEGER;
        let max_col = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < keys.length; i++) {
            const placement = placementToDominoes[keys[i]].placement;
            if (placement.x < min_col) {
                min_col = placement.x;
            }
            if (placement.y < min_row) {
                min_row = placement.y;
            }
            if (placement.x > max_col) {
                max_col = placement.x;
            }
            if (placement.y > max_row) {
                max_row = placement.y;
            }
        }
        return { 'min_row': min_row, 'min_col': min_col, 'max_row': max_row, 'max_col': max_col };
    }

    render() {
        const endResult = this.getEndResult();
        const bankbtn_class = this.state.bank.length > 0 || this.state.player1Deck.length > 0 ? '' : 'bankbtn_hidden';
        return (
            <div>
                <h1>Dominoes <img src={ImageHeadline} /> Game!</h1>
                <button onClick={() => Game.onReset()}>
                    Reset
                </button>
                <h2>board:</h2>
                <div
                    onDragOver={(e) => Game.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e)}>
                    <Board allDominoes={AllDominoes} valid_placements={this.state.valid_placements} dominoes={this.state.board} num_cols={this.state.num_cols} num_rows={this.state.num_rows}/>
                </div>
                <h2>Player deck:</h2>
                <div onDragOver={(e) => Game.onDragOver(e)}>
                    <PlayerDeck allDominoes={AllDominoes} sendDrag={this.getDrag} sendData={this.getData} dominoes={this.state.player1Deck} />
                </div>
                <button className={bankbtn_class} onClick={() => this.getBankDomino()}>
                    Get domino from the bank
                </button>
                <h2>Plays counter: {this.state.playsCount}</h2>
                <h3>{endResult}</h3>
            </div >
        );
    }
}

export default Game;