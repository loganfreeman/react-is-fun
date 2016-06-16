import React, { Component, PropTypes } from 'react';

export class ReactCanvasSimple extends Component {

  static propTypes = {
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
    ast: PropTypes.object
  };

  componentDidMount() {
    var $ = go.GraphObject.make;
    var myDiagram = $(go.Diagram, "myDiagramDiv");

  }

  render() {
    let surfaceWidth = this.props.surfaceWidth;
    let surfaceHeight = this.props.surfaceHeight;
    let imageStyle = this.getImageStyle();
    let textStyle = this.getTextStyle();
    let styles = {
      width: "400px",
      height: "150px",
      backgroundColor: "#DAE4E4"
    }
    return (
      <div>
        <h1>This is a simple canvas</h1>
        <div id="myDiagramDiv"
             style={styles}
             ref={(c) => this.canvas = c}></div>
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
