import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"
import PropTypes from 'prop-types';

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
              placementToDominoes[domino.placement.x + ',' + domino.placement.y] = domino.dot;
          }
      }
      return (
          xaxis.map((i) => (
              yaxis.map((j) => (
                  i + ',' + j in placementToDominoes ? <Domino key={i + ',' + j} domino={this.props.dominoes[placementToDominoes[i + ',' + j]]}/> :
                <div key={i + ',' + j} id={i + ',' + j}>test</div>
            ))
          ))
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

Board.propTypes = {
    dominoes: PropTypes.instanceOf(Object).isRequired
};

export default Board;