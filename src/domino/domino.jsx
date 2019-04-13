import React, { Component } from "react";
import PropTypes from "prop-types";

import "./domino.css";
import { HalfDomino, Up, Down, Left, Right } from "./halfDomino.jsx";

const Horizontal = "Horizontal";
const Vertical = "Vertical";

class Domino extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDirections() {
    return (
      this.props.direction === Horizontal ? [Left, Right] : [Up, Down]
    );
  }

  render() {
    let [dir1, dir2] = this.getDirections();
    return (
      <table className="domino">
        <tbody>
          <tr>
            <td><HalfDomino direction={dir1} value={this.props.dots1} /></td>
            <td><HalfDomino direction={dir2} value={this.props.dots2} /></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Domino.propTypes = {
  direction: PropTypes.oneOf([Horizontal, Vertical]).isRequired,
  dots1: PropTypes.number.isRequired,
  dots2: PropTypes.number.isRequired,
}

export { Domino, Horizontal, Vertical };
