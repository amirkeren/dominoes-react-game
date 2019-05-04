import React, { Component } from "react";

import './playerDeck.css';
import { Domino } from "./domino/domino.jsx"

class PlayerDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getData = this.getData.bind(this);
  }

  getData(val) {
    this.props.sendData(val);
  }

  static onDragStart(ev, id) {
    ev.dataTransfer.setData("id", id);
  }

  getDominoes() {
    return (
      Object.keys(this.props.dominoes).map((domino) => (
        <td key={domino} onDragStart={(e) => PlayerDeck.onDragStart(e, domino)} draggable>
          <Domino sendData={this.getData} domino={this.props.dominoes[domino]}/>
        </td>
      ))
    );
  }

  getDeck() {
    return (
      <div className="player-deck">
        <table>
          <tbody>
            <tr>
              {this.getDominoes()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (this.getDeck());
  }
}

export default PlayerDeck;