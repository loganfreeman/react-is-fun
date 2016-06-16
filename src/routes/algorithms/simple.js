import React, { Component, PropTypes } from 'react';

export class ReactCanvasSimple extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
    nodes: PropTypes.array
  };

  makeDiagram() {
    let $ = go.GraphObject.make;

    let myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          initialContentAlignment: go.Spot.Center, // center Diagram contents
          "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
          layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 })
        });

    // the template we defined earlier
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        { background: "#44CCFF" },
        $(go.TextBlock, "Default Text",
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          new go.Binding("text", "name"))
      );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    let model = $(go.TreeModel);
    let key = 1, nodes = [];
    let findNodeKey = (node) => {
      for(let n of nodes) {
        if(n === node) {
          return n.key;
        }
      }
    }
    if(this.props.nodes) {
      let nodeDataArray = [];
      for(let nodePair of this.props.nodes) {
        let node = nodePair[0], parent = nodePair[1], parentKey;
        node.key = key;
        nodes.push(node);
        if(parent) {
          parentKey = findNodeKey(parent);
          nodeDataArray.push({
            key: key,
            name: node.type,
            parent: parentKey
          })
        }else {
          nodeDataArray.push({
            key: key,
            name: node.type
          })
        }
        key++;
      }
      // console.log(nodeDataArray);
      model.nodeDataArray = nodeDataArray;
    }
    myDiagram.model = model;
  }

  updateModel(myDiagram) {
    let model = $(go.TreeModel);
    let key = 1, nodes = [];
    let findNodeKey = (node) => {
      for(let n of nodes) {
        if(n === node) {
          return n.key;
        }
      }
    }
    if(this.props.nodes) {
      let nodeDataArray = [];
      for(let nodePair of this.props.nodes) {
        let node = nodePair[0], parent = nodePair[1], parentKey;
        node.key = key;
        nodes.push(node);
        if(parent) {
          parentKey = findNodeKey(parent);
          nodeDataArray.push({
            key: key,
            name: node.type,
            parent: parentKey
          })
        }else {
          nodeDataArray.push({
            key: key,
            name: node.type
          })
        }
        key++;
      }
      // console.log(nodeDataArray);
      model.nodeDataArray = nodeDataArray;
    }
    myDiagram.model = model;
  }

  componentDidMount() {
    this.makeDiagram();
  }

  componentWillUpdate() {

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
        <h1>Node tree displayed using gojs</h1>
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
