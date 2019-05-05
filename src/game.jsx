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
        let randomPlayer1Dominoes = Game.getRandomPlayer1Dominoes();
        this.state = {
            player1Deck: Object.fromEntries(Object.entries(AllDominoes).filter(([k, ]) => randomPlayer1Dominoes.includes(k))),
            bank: Object.fromEntries(Object.entries(AllDominoes).filter(([k, ]) => !randomPlayer1Dominoes.includes(k))),
            board: {},
            playsCount: 0,
        };
        this.getData = this.getData.bind(this);
    }

    getData(val) {
        this.state.player1Deck[val.dot].direction = val.direction;
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
        const neighborUp = Game.getDominoByPlacement({ x: x.toString(), y: (y - 1).toString() });
        const neighborDown = Game.getDominoByPlacement({ x: x.toString(), y: (y + 1).toString() });
        const neighborLeft = Game.getDominoByPlacement({ x: (x - 1).toString(), y: y.toString() });
        const neighborRight = Game.getDominoByPlacement({ x: (x + 1).toString(), y: y.toString() });
        //TODO - handle 0 value, wildcards, horizontal with vertical placement etc.
        if (neighborUp) {
            let dot;
            if (domino.direction === Up) {
                dot = Math.floor(domino.dot / 10);
            } else if (domino.direction === Down) {
                dot = domino.dot % 10;
            }
            if (neighborUp.direction === Up && dot !== 0 && neighborDown.dot % 10 !== 0 && neighborUp.dot % 10 !== dot) {
                return false;
            }
            if (neighborUp.direction === Down && dot !== 0 && Math.floor(neighborUp.dot / 10) !== 0 && Math.floor(neighborUp.dot / 10) !== dot) {
                return false;
            }
        }
        if (neighborDown) {
            let dot;
            if (domino.direction === Up) {
                dot = domino.dot % 10;
            } else if (domino.direction === Down) {
                dot = Math.floor(domino.dot / 10);
            }
            if (neighborDown.direction === Up && dot !== 0 && Math.floor(neighborLeft.dot / 10) !== 0 && Math.floor(neighborDown.dot / 10) !== dot) {
                return false;
            }
            if (neighborDown.direction === Down && dot !== 0 && neighborDown.dot % 10 !== 0 && neighborDown.dot % 10 !== dot) {
                return false;
            }
        }
        if (neighborLeft) {
            let dot;
            if (domino.direction === Left) {
                dot = Math.floor(domino.dot / 10);
            } else if (domino.direction === Right) {
                dot = domino.dot % 10;
            }
            if (neighborLeft.direction === Left && dot !== 0 && neighborRight.dot % 10 !== 0 && neighborLeft.dot % 10 !== dot) {
                return false;
            }
            if (neighborLeft.direction === Right && dot !== 0 && Math.floor(neighborLeft.dot / 10) !== 0 && Math.floor(neighborLeft.dot / 10) !== dot) {
                return false;
            }
        }
        if (neighborRight) {
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
            const placement = { 'x': ev.target.id.split(',')[1], 'y': ev.target.id.split(',')[0] };
        //TODO - check this if line
        // if (Object.keys(this.state.bank).length > 0) {
            const idDropped = parseInt(ev.dataTransfer.getData('id'));
            if (!Game.isValidPlacement(AllDominoes[idDropped], placement)) {
                return;
            }
            let boardCopy = JSON.parse(JSON.stringify(this.state.board));
            boardCopy[idDropped] = AllDominoes[idDropped];
            boardCopy[idDropped].placement = placement;
            this.setState({
                player1Deck: Object.fromEntries(Object.entries(this.state.player1Deck).filter(([k, ]) => { return k !== idDropped.toString() })),
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
                    onDrop={(e) => this.onDrop(e)}
                >
                    <Board dominoes={this.state.board} />
                </div>
                <h2>Player deck:</h2>
                <div onDragOver={(e) => Game.onDragOver(e)}>
                    <PlayerDeck sendData={this.getData} dominoes={this.state.player1Deck} />
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