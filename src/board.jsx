import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDominoes() {
      const xaxis = Array.from(Array(3), (x, index) => index + 1);
      const yaxis = Array.from(Array(3), (x, index) => index + 1);
      const keys = Object.keys(this.props.dominoes);
      const placementToDominoes = {};
      for (let i = 0; i < keys.length; i++) {
          const domino = this.props.dominoes[keys[i]];
          if (domino.placement) {
              placementToDominoes[domino.placement.y + ',' + domino.placement.x] = domino.dot;
          }
      }
      let array = [];
      for (let i = 1; i <= xaxis.length; i++) {
          for (let j = 1; j<= yaxis.length; j++) {
              if (i + ',' + j in placementToDominoes) {
                  array.push(<Domino key={i + ',' + j} domino={this.props.dominoes[placementToDominoes[i + ',' + j]]}/>);
              } else {
                  array.push(<div className='placeholder' key={i + ',' + j} id={i + ',' + j}> </div>);
              }
          }
      }
      return (
          array
      );
  }

  getBoard() {
    return (
      <div className="board">
        {this.getDominoes()}
      </div>
    );
  }

  render() {
    return (this.getBoard());
  }
}

export default Board;