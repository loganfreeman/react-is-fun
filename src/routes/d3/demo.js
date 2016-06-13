import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './demo.css';
class Demo extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  render() {
    return (
      <div className="d3demo" />
    )
  }
}

export default withStyles(s)(Demo);
