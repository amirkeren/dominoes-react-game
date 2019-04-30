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
    let dots1 = Math.floor(this.props.dots / 10);
    let dots2 = Math.floor(this.props.dots % 10);
    return (
        <div className="item">
          <table className="domino vertical">
            <tbody>
              <tr>
                <td><HalfDomino direction={dir1} value={dots1} /></td>
                <td><HalfDomino direction={dir2} value={dots2} /></td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

Domino.propTypes = {
  direction: PropTypes.oneOf([Horizontal, Vertical]).isRequired,
  dots: PropTypes.number.isRequired,
}

export { Domino, Horizontal, Vertical };
