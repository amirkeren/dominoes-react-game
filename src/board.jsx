import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const placementToDominoes = {};
      for (let i = 0; i < this.props.dominoes.length; i++) {
          const domino = this.props.allDominoes[this.props.dominoes[i]];
          placementToDominoes[domino.placement.y + ',' + domino.placement.x] = domino.dot;
      }
      const num_rows = this.props.num_rows;
      const num_cols = this.props.num_cols;
      let rows = [];
      for (let i = 1; i <= num_rows; i++){
          const rowID = `row${i}`;
          let cell = [];
          for (let j = 1; j <= num_cols; j++ ){
              const cellID = `${i},${j}`;
              if (i + ',' + j in placementToDominoes) {
                  cell.push(<td key={cellID} id={cellID}><Domino domino={this.props.allDominoes[placementToDominoes[cellID]]}/></td>);
              } else {
                  cell.push(<td className="placeholder" key={cellID} id={cellID}/>);
              }
          }
          rows.push(<tr key={i} id={rowID}>{cell}</tr>);
      }
      return(
          <div className="board">
              <table>
                  <tbody>
                  {rows}
                  </tbody>
              </table>
          </div>
      )
  }
}

export default Board;