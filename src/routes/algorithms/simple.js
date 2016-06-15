import React, { Component, PropTypes } from 'react';

export class ReactCanvasSimple extends Component {

  static propTypes = {
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
  };

  render() {
    let surfaceWidth = this.props.surfaceWidth;
    let surfaceHeight = this.props.surfaceHeight;
    let imageStyle = this.getImageStyle();
    let textStyle = this.getTextStyle();
    return (
      <div>
        <h1>This is a simple canvas</h1>
      </div>
    )
  }

  getImageHeight() {
    return Math.round(this.props.surfaceHeight / 2);
  }

  getImageStyle() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: this.getImageHeight()
    };
  }

  getTextStyle() {
    return {
      top: this.getImageHeight() + 10,
      left: 0,
      width: this.props.surfaceWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }
}

const SimpleCanvasCallback = (width, height) => {
  return <ReactCanvasSimple surfaceWidth={width} surfaceHeight={height} />
}

export default SimpleCanvasCallback;
