import React, { Component, PropTypes } from 'react';

export class ReactCanvasSimple extends Component {

  static propTypes = {
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
    ast: PropTypes.object
  };

  makeDiagram() {
    var $ = go.GraphObject.make;
    var myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          initialContentAlignment: go.Spot.Center, // center Diagram contents
          "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    // define a simple Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        // the entire node will have a light-blue background
        { background: "#44CCFF" },
        $(go.Picture,
          // Pictures should normally have an explicit width and height.
          // This picture has a red background, only visible when there is no source set
          // or when the image is partially transparent.
          { margin: 10, width: 50, height: 50, background: "red" },
          // Picture.source is data bound to the "source" attribute of the model data
          new go.Binding("source")),
        $(go.TextBlock,
          "Default Text",  // the initial value for TextBlock.text
          // some room around the text, a larger font, and a white stroke:
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          // TextBlock.text is data bound to the "name" attribute of the model data
          new go.Binding("text", "name"))
      );

    var model = $(go.Model);
    model.nodeDataArray =
    [ // note that each node data object holds whatever properties it needs;
      // for this app we add the "name" and "source" properties
      { name: "Don Meow", source: "cat1.jpeg" },
      { name: "Copricat", source: "cat1.jpeg" },
      { name: "Demeter",  source: "cat1.jpeg" },
      { /* Empty node data */  }
    ];
    myDiagram.model = model;
  }

  componentDidMount() {
    this.makeDiagram();

  }

  render() {
    let surfaceWidth = this.props.surfaceWidth;
    let surfaceHeight = this.props.surfaceHeight;
    let imageStyle = this.getImageStyle();
    let textStyle = this.getTextStyle();
    let styles = {
      width: "600px",
      height: "800px",
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
