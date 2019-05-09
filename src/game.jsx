import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"
import { Left, Right, Up, Down } from "./domino/halfDomino.jsx";

const PlayerInitialDominoesCount = 6;

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
        this.state = {
            player1Deck: Object.keys(AllDominoes).filter((k) => randomPlayer1Dominoes.includes(k)),
            bank: Object.keys(AllDominoes).filter((k) => !randomPlayer1Dominoes.includes(k)),
            board: [],
            playsCount: 0,
            num_rows: 1,
            num_cols: 1
        };
        this.getData = this.getData.bind(this);
    }

    getData(val) {
        AllDominoes[val.dot].direction = val.direction;
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

    static isValidPlacement(domino, placement) {
        const x = parseInt(placement.x);
        const y = parseInt(placement.y);
        const neighborUp = Game.getDominoByPlacement({ x: x, y: y - 1 });
        const neighborDown = Game.getDominoByPlacement({ x: x, y: y + 1 });
        const neighborLeft = Game.getDominoByPlacement({ x: x - 1, y: y });
        const neighborRight = Game.getDominoByPlacement({ x: x + 1, y: y });
        //TODO - handle 0 value, wildcards, horizontal with vertical placement etc.
        if (neighborUp) {
            //TODO - unsupported for now
            if (((domino.direction === Left || domino.direction === Right)) ||
                ((domino.direction === Up || domino.direction === Down) &&
                (neighborUp.direction === Left || neighborUp.direction === Right))) {
                return false;
            }
            let dot;
            if (domino.direction === Up) {
                dot = Math.floor(domino.dot / 10);
            } else if (domino.direction === Down) {
                dot = domino.dot % 10;
            }
            if (neighborUp.direction === Up && dot !== 0 && neighborUp.dot % 10 !== 0 && neighborUp.dot % 10 !== dot) {
                return false;
            }
            if (neighborUp.direction === Down && dot !== 0 && Math.floor(neighborUp.dot / 10) !== 0 && Math.floor(neighborUp.dot / 10) !== dot) {
                return false;
            }
        }
        if (neighborDown) {
            //TODO - unsupported for now
            if (((domino.direction === Left || domino.direction === Right)) ||
                ((domino.direction === Up || domino.direction === Down) &&
                    (neighborDown.direction === Left || neighborDown.direction === Right))) {
                return false;
            }
            let dot;
            if (domino.direction === Up) {
                dot = domino.dot % 10;
            } else if (domino.direction === Down) {
                dot = Math.floor(domino.dot / 10);
            }
            if (neighborDown.direction === Up && dot !== 0 && Math.floor(neighborDown.dot / 10) !== 0 && Math.floor(neighborDown.dot / 10) !== dot) {
                return false;
            }
            if (neighborDown.direction === Down && dot !== 0 && neighborDown.dot % 10 !== 0 && neighborDown.dot % 10 !== dot) {
                return false;
            }
        }
        if (neighborLeft) {
            //TODO - unsupported for now
            if (((domino.direction === Left || domino.direction === Right) &&
                (neighborLeft.direction === Up || neighborLeft.direction === Down)) ||
                ((domino.direction === Up || domino.direction === Down))) {
                return false;
            }
            let dot;
            if (domino.direction === Left) {
                dot = Math.floor(domino.dot / 10);
            } else if (domino.direction === Right) {
                dot = domino.dot % 10;
            }
            if (neighborLeft.direction === Left && dot !== 0 && neighborLeft.dot % 10 !== 0 && neighborLeft.dot % 10 !== dot) {
                return false;
            }
            if (neighborLeft.direction === Right && dot !== 0 && Math.floor(neighborLeft.dot / 10) !== 0 && Math.floor(neighborLeft.dot / 10) !== dot) {
                return false;
            }
        }
        if (neighborRight) {
            //TODO - unsupported for now
            if (((domino.direction === Left || domino.direction === Right) &&
                (neighborRight.direction === Up || neighborRight.direction === Down)) ||
                ((domino.direction === Up || domino.direction === Down))) {
                return false;
            }
            let dot;
            if (domino.direction === Left) {
                dot = domino.dot % 10;
            } else if (domino.direction === Right) {
                dot = Math.floor(domino.dot / 10);
            }
            if (neighborRight.direction === Left && dot !== 0 && Math.floor(neighborRight.dot / 10) !== 0 && Math.floor(neighborRight.dot / 10) !== dot) {
                return false;
            }
            if (neighborRight.direction === Right && dot !== 0 && neighborRight.dot % 10 !== 0 && neighborRight.dot % 10 !== dot) {
                return false;
            }
        }
        return true;
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
            const placement = { 'x': parseInt(ev.target.id.split(',')[1]), 'y': parseInt(ev.target.id.split(',')[0]) };
        //TODO - check this if line
        // if (Object.keys(this.state.bank).length > 0) {
            const idDropped = parseInt(ev.dataTransfer.getData('id'));
            if (!Game.isValidPlacement(AllDominoes[idDropped], placement)) {
                return;
            }
            AllDominoes[idDropped].placement = placement;
            let boardCopy = this.state.board.concat(idDropped);
            this.getRowsColsNumber(boardCopy);
            this.setState({
                player1Deck: this.state.player1Deck.filter((k) => { return k !== idDropped.toString() }),
                board: boardCopy,
                bank: this.state.bank,
                playsCount: this.state.playsCount + 1,
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
        const keys = Object.keys(this.state.bank);
        const randBankDomino = keys[Math.floor(Math.random() * keys.length)];
        let player1DeckCopy = JSON.parse(JSON.stringify(this.state.player1Deck));
        player1DeckCopy[randBankDomino] = AllDominoes[randBankDomino];
        this.setState({
            player1Deck: player1DeckCopy,
            bank: Object.fromEntries(Object.entries(this.state.bank).filter(([k, ]) => k !== randBankDomino)),
            board: this.state.board,
            playsCount: this.state.playsCount,
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
        const bankbtn_class = Object.keys(this.state.bank).length > 0 ? '' : 'bankbtn_hidden';
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
                    <Board allDominoes={AllDominoes} dominoes={this.state.board} num_cols={this.state.num_cols} num_rows={this.state.num_rows}/>
                </div>
                <h2>Player deck:</h2>
                <div onDragOver={(e) => Game.onDragOver(e)}>
                    <PlayerDeck allDominoes={AllDominoes} sendData={this.getData} dominoes={this.state.player1Deck} />
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