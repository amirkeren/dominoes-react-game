import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"
import { Left } from "./domino/halfDomino.jsx";

const PlayerInitialDominoesCount = 6;

let AllDominoes = {
    0:  { direction: Left }, 1:  { direction: Left }, 2:  { direction: Left }, 3:  { direction: Left }, 4:  { direction: Left }, 5:  { direction: Left }, 6:  { direction: Left },
    11: { direction: Left }, 12: { direction: Left }, 13: { direction: Left }, 14: { direction: Left }, 15: { direction: Left }, 16: { direction: Left },
    22: { direction: Left }, 23: { direction: Left }, 24: { direction: Left }, 25: { direction: Left }, 26: { direction: Left },
    33: { direction: Left }, 34: { direction: Left }, 35: { direction: Left }, 36: { direction: Left },
    44: { direction: Left }, 45: { direction: Left }, 46: { direction: Left },
    55: { direction: Left }, 56: { direction: Left },
    66: { direction: Left }
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
        this.state.player1Deck[val.domino].direction = val.direction;
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

    onDrop(ev) {
        if (Object.keys(this.state.bank).length > 0) {
            let idDropped = parseInt(ev.dataTransfer.getData("id"));
            let boardCopy = JSON.parse(JSON.stringify(this.state.board));
            boardCopy[idDropped] = AllDominoes[idDropped];
            this.setState({
                player1Deck: Object.fromEntries(Object.entries(this.state.player1Deck).filter(([k, ]) => { return k !== idDropped })),
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
        var randBankDomino = keys[Math.floor(Math.random() * keys.length)];
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
        let endResult = this.getEndResult();
        let bankbtn_class = Object.keys(this.state.bank).length > 0 ? '' : 'bankbtn_hidden';
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
