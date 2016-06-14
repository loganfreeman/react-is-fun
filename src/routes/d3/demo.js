import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './demo.css';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import _ from 'underscore';
import {Map, fromJS} from 'immutable';
import {LineChart, ScatterChart, AreaChart, Treemap} from 'react-d3';

class Demo extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    let state = {};
    Object.getOwnPropertyNames(this.props.categories).forEach((category) => {
      state[category] = {};
      state[category].open = false;
    })
    this.state = {
      categories: fromJS(state)
    };
  }

  static propTypes = {
    title: PropTypes.string,
    categories: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  handleCategoryClick(category) {
    let categories = this.state.categories;
    let state = categories.getIn([category, 'open']);
    categories = categories.setIn([category, 'open'], !state);
    this.setState({
      categories: categories
    })
    //console.log(JSON.stringify(categories.toJS(), null, 2))
  }

  handleItemClick(item) {
    this.setState({
      chart: item
    })
  }

  getLineChart() {
    let lineData = [
      {
        name: "series1",
        values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      },
      {
        name: "series2",
        values: [ { x: 70, y: 82 },  { x: 76, y: 82 } ]
      }
    ];
    let viewBoxObject = {
      x: 0,
      y: 0,
      width: 500,
      height: 400
    };
    return (
      <LineChart
        legend={true}
        data={lineData}
        width={400}
        height={400}
        viewBoxObject={viewBoxObject}
        title="Line Chart"
        yAxisLabel="Altitude"
        xAxisLabel="Elapsed Time (sec)"
        gridHorizontal={true}
      />
    )
  }

  getScatterChart() {
    let scatterData = [
      {
        name: "series1",
        values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ]
      },
      {
        name: "series3",
        values: [ { x: 70, y: 82 }, { x: 76, y: 82 } ]
      }
    ];
    return (
      <ScatterChart
        data={scatterData}
        width={500}
        height={400}
        title="Scatter Chart"
      />
    )
  }

  getTreemap() {
    let treemapData = [
  {label: "China", value: 1364},
  {label: "India", value: 1296},
  {label: "Brazil", value: 203}
];
    return (
      <Treemap
        data={treemapData}
        width={450}
        height={250}
        textColor="#484848"
        fontSize="12px"
        title="Treemap"
        hoverAnimation={false}
      />
    )
  }

  getContent(chart) {
    if(chart === 'Line Chart'){
      return this.getLineChart();
    }
    if(chart === 'Scatter Chart') {
      return this.getScatterChart();
    }
    if(chart === 'Treemap') {
      return this.getTreemap();
    }

    return <h1>No Chart Selected</h1>
  }

  render() {
    let content = this.getContent(this.state.chart);
    let styles = {
      height: "900px",
    }


    let lists = Object.getOwnPropertyNames(this.props.categories).map((category, i) => {
      let display = this.state.categories.getIn([category, 'open']) ? 'block' : 'none';
      let indent = {
        "paddingLeft": "28px",
        display: display
      }

      let items = this.props.categories[category].map((item, j) => {
        return (
          <ListItem style={indent} primaryText={item} key={j+1} onClick={this.handleItemClick.bind(this, item)}>
          </ListItem>
        )
      })
      items.unshift(
        <ListItem key={0} primaryText={category} rightIcon={<NavigationArrowForward />} onClick={this.handleCategoryClick.bind(this, category)}/>
      )
      return (
        <List key={i}>
          {items}
        </List>
      )
    })
    return (
      <div className="HolyGrail-body" style={styles}>
        <main className="HolyGrail-content">{content}</main>
        <div className="HolyGrail-nav">
          {lists}
        </div>
        <aside className="HolyGrail-ads"></aside>
      </div>
    )
  }
}

export default withStyles(s)(Demo);
