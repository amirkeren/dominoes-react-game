import React, { Component } from "react";

import './playerDeck.css';
import { Domino, Horizontal, Vertical } from "./domino/domino.jsx"

class PlayerDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getInitialDeck() {
    return (
      <div className="player-deck">
        <table>
          <tbody>
            <tr>
              <td><Domino direction={Horizontal} dots1={5} dots2={2} /></td>
              <td><Domino direction={Horizontal} dots1={3} dots2={1} /></td>
              <td><Domino direction={Horizontal} dots1={0} dots2={0} /></td>
              <td><Domino direction={Horizontal} dots1={6} dots2={4} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (this.getInitialDeck());
  }
}

export default PlayerDeck;
