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
    let styles = {
      height: "900px"
    }
    let indent = {
      "padding-left": "28px"
    }
    return (
      <div className="HolyGrail-body" style={styles}>
        <main className="HolyGrail-content">…</main>
        <nav className="HolyGrail-nav">
          <List>
            <ListItem primaryText="Inbox" rightIcon={<NavigationArrowForward />} />
            <ListItem style={indent} primaryText="Starred" leftIcon={<ActionGrade />} />
            <ListItem style={indent} primaryText="Sent mail" leftIcon={<ContentSend />} />
            <ListItem style={indent} primaryText="Drafts" leftIcon={<ContentDrafts />} />
            <ListItem style={indent} primaryText="Inbox" leftIcon={<ContentInbox />} />
          </List>
          <List>
            <ListItem primaryText="All mail" rightIcon={<NavigationArrowForward />} />
            <ListItem style={indent} primaryText="Trash" rightIcon={<ActionInfo />} />
            <ListItem style={indent} primaryText="Spam" rightIcon={<ActionInfo />} />
            <ListItem style={indent} primaryText="Follow up" rightIcon={<ActionInfo />} />
          </List>
        </nav>
        <aside className="HolyGrail-ads">…</aside>
      </div>
    )
  }
}

export default withStyles(s)(Demo);
