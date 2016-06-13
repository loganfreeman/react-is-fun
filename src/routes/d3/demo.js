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
    console.log(item);
  }



  render() {
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
        <main className="HolyGrail-content">…</main>
        <div className="HolyGrail-nav">
          {lists}
        </div>
        <aside className="HolyGrail-ads">…</aside>
      </div>
    )
  }
}

export default withStyles(s)(Demo);
