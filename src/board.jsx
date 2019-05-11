import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"
import { Down, Up } from "./domino/halfDomino.jsx";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const placementToDominoes = {};
      const validPlacements = this.props.valid_placements;
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
          let cellsToRemove = [];
          for (let j = 1; j <= num_cols; j++ ){
              const cellID = `${i},${j}`;
              if (i + ',' + j in placementToDominoes) {
                  const domino = this.props.allDominoes[placementToDominoes[cellID]];
                  const cellStyle = {
                      width: '50px',
                      height: '50px',
                      transform: 'rotate(' + domino.direction + 'deg)',
                  };
                  if (domino.direction === Up || domino.direction === Down) {
                      cell.push(<td rowSpan="2" style={cellStyle} key={cellID} id={cellID}><Domino domino={domino}/>
                      </td>);
                      cellsToRemove.push((i + 1) + ',' + j);
                  } else {
                      cell.push(<td colSpan="2" style={cellStyle} key={cellID} id={cellID}><Domino domino={domino}/>
                      </td>);
                      cellsToRemove.push(i + ',' + (j + 1));
                      console.log(cellsToRemove);
                  }
              } else if (!cellsToRemove.includes(i + ',' + j)) {
                if (validPlacements.includes(i + ',' + j)) {
                  cell.push(<td className="possible_location_placeholder" key={cellID} id={cellID}/>);
                } else {
                  cell.push(<td className="placeholder" key={cellID} id={cellID}/>);
                }
              }
          }
          rows.push(<tr key={i} id={rowID}>{cell}</tr>);
      }
      return(
          <div className="container">
              <table className="board">
                  <tbody>
                  {rows}
                  </tbody>
              </table>
          </div>
      )
  }
}

export default Board;