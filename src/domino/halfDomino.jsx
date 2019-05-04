import React, { Component } from "react";
import PropTypes from "prop-types";

import "./domino.css";
import DotCell from "./dotCell.jsx";

export const Up = "Up";
export const Down = "Down";
export const Right = "Right";
export const Left = "Left";
const valueToDottedCells = {
  0: [],
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

class HalfDomino extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  isCellDotted(index, value) {
    return (valueToDottedCells[value].includes(index));
  }

  getTable() {
    return (
      <table className="domino">
        <tbody>
          <tr>
            <DotCell isDotted={this.isCellDotted(0, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(1, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(2, this.props.value)} />
          </tr>
          <tr>
            <DotCell isDotted={this.isCellDotted(3, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(4, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(5, this.props.value)} />
          </tr>
          <tr>
            <DotCell isDotted={this.isCellDotted(6, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(7, this.props.value)} />
            <DotCell isDotted={this.isCellDotted(8, this.props.value)} />
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return (this.getTable());
  }
}

HalfDomino.propTypes = {
  value: PropTypes.number.isRequired,
};

export { HalfDomino };
