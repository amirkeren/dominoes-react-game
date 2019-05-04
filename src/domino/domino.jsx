import React, { Component } from "react";
import PropTypes from "prop-types";

import "./domino.css";
import { HalfDomino, Up, Down, Left, Right } from "./halfDomino.jsx";

class Domino extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domino: this.props.domino
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.used) {
      let dominoCopy = JSON.parse(JSON.stringify(this.state.domino));
      switch (dominoCopy.direction) {
        case Left:
          dominoCopy.direction = Up;
          break;
        case Up:
          dominoCopy.direction = Right;
          break;
        case Right:
          dominoCopy.direction = Down;
          break;
        case Down:
          dominoCopy.direction = Left;
          break;
      }
      this.props.sendData(dominoCopy);
      this.setState({domino: dominoCopy});
    }
  }

  render() {
    let dots1 = Math.floor(this.props.domino.dot / 10);
    let dots2 = Math.floor(this.props.domino.dot % 10);
    const classes = `item ${this.state.domino.direction}`;
    return (
        <div className={classes} onClick={this.onClick}>
          <table className="domino">
            <tbody>
              <tr>
                <td><HalfDomino value={dots1} /></td>
                <td><HalfDomino value={dots2} /></td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

Domino.propTypes = {
  //placement will render used redundant
  used: PropTypes.bool
};

export { Domino };
