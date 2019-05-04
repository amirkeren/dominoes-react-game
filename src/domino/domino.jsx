import React, { Component } from "react";
import PropTypes from "prop-types";

import "./domino.css";
import { HalfDomino, Up, Down, Left, Right } from "./halfDomino.jsx";

class Domino extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: this.props.direction,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.used) {
      switch (this.state.direction) {
        case Left:
          this.props.sendData({'domino': this.props.dots, 'direction': Up});
          this.setState({direction: Up});
          break;
        case Up:
          this.props.sendData({'domino': this.props.dots, 'direction': Right});
          this.setState({direction: Right});
          break;
        case Right:
          this.props.sendData({'domino': this.props.dots, 'direction': Down});
          this.setState({direction: Down});
          break;
        case Down:
          this.props.sendData({'domino': this.props.dots, 'direction': Left});
          this.setState({direction: Left});
          break;
      }
    }
  }

  render() {
    let dots1 = Math.floor(this.props.dots / 10);
    let dots2 = Math.floor(this.props.dots % 10);
    const classes = `item ${this.state.direction}`;
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
  direction: PropTypes.oneOf([Left, Right, Up, Down]).isRequired,
  used: PropTypes.bool,
  dots: PropTypes.number.isRequired,
};

export { Domino };
