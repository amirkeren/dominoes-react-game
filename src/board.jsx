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
      if (Object.keys(this.props.dominoes).length === 0) {
          const xaxis = Array.from(Array(3), (x, index) => index + 1);
          const yaxis = Array.from(Array(3), (x, index) => index + 1);
          return (
              xaxis.map((i) => (
                  yaxis.map((j) => (
                    <div key={i + "," + j} id={i + "," + j}>test</div>
                ))
              ))
          );
      } else {
          return (
              Object.keys(this.props.dominoes).map((domino) => (
                  <Domino key={domino} domino={this.props.dominoes[domino]}/>
              ))
          );
      }
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