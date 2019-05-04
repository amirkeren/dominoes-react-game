import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"

const PlayerInitialDominoesCount = 6;
const AllDominoes = [
    0, 1, 2, 3, 4, 5, 6,
    11, 12, 13, 14, 15, 16,
    22, 23, 24, 25, 26,
    33, 34, 35, 36,
    44, 45, 46,
    55, 56,
    66,
];

class Game extends Component {
    constructor(props) {
        super(props);
        let randomPlayer1DominoesIndexes = Game.getRandomPlayer1DominoesIndexes();
        this.state = {
            player1Deck: AllDominoes.filter(
                (_, i) => randomPlayer1DominoesIndexes.includes(i)),
            bank: AllDominoes.filter(
                (_, i) => !randomPlayer1DominoesIndexes.includes(i)),
            directions: {},
            board: [],
            playsCount: 0,
        };
        this.getData = this.getData.bind(this);
    }

    getData(val) {
        this.state.directions[val.domino] = val.direction;
    }

    static getRandomPlayer1DominoesIndexes() {
        const randomPlayer1DominoesIndexes = [];
        while (randomPlayer1DominoesIndexes.length < PlayerInitialDominoesCount) {
            const randIndex = Math.floor(Math.random() * AllDominoes.length);
            if (!randomPlayer1DominoesIndexes.includes(randIndex)) {
                randomPlayer1DominoesIndexes.push(randIndex);
            }
        }
        return randomPlayer1DominoesIndexes;
    }

    static onDragOver(ev) {
        return (ev.preventDefault());
    }

    onDrop(ev) {
        if (this.state.bank.length > 0) {
            let idDropped = parseInt(ev.dataTransfer.getData("id"));

            this.setState({
                player1Deck: this.state.player1Deck.filter((item) => item !== idDropped),
                board: this.state.board.concat(idDropped),
                bank: this.state.bank,
                playsCount: this.state.playsCount + 1,
            })
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
        var randBankIndex = Math.floor(Math.random() * this.state.bank.length);
        this.setState({
            player1Deck: this.state.player1Deck.concat(this.state.bank[randBankIndex]),
            bank: this.state.bank.filter((_, i) => i !== randBankIndex),
            board: this.state.board,
            playsCount: this.state.playsCount,
        });
    }

    render() {
        let endResult = this.getEndResult();
        let bankbtn_class = this.state.bank.length > 0 ? '' : 'bankbtn_hidden';
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
                    <Board directions={this.state.directions} dominoes={this.state.board} />
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
