import React, { Component } from "react";
import PropTypes from "prop-types";

import "./domino.css";

class DotCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getStyle() {
    return (this.props.isDotted ? "dotted" : "empty-dot");
  }

  render() {
    return (
      <td className={this.getStyle()}></td>
    );
  }
}

DotCell.propTypes = {
  isDotted: PropTypes.bool,
}

DotCell.defaultProps = {
  isDotted: true,
}

export default DotCell;
