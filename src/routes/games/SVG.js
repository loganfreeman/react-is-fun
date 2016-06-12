import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SVG.css';
import * as Utils from './utils';
import classNames from 'classnames/bind';

class Game extends React.Component {
  render() {
    let styles = {
      "font-family": "sans-serif",
      width: "400px",
      height: "400px"

    }
    return (
      <div>
      <svg style={styles}>
      <rect x="25" y="25" width="200" height="200" fill="lime" stroke-width="4" stroke="pink" />
      <circle cx="125" cy="125" r="75" fill="orange" />
      <polyline points="50,150 50,200 200,200 200,100" stroke="red" stroke-width="4" fill="none" />
      <line x1="50" y1="50" x2="200" y2="200" stroke="blue" stroke-width="4" />
      </svg>

      </div>
    )
  }
}
export default withStyles(s)(Game);
