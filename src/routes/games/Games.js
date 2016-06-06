import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Games.css';

class Games extends Component {

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
    menus: React.PropTypes.array.isRequired,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  render() {
    let menus = this.props.menus.map((menu) => {
      return <li className="menu-item" key={menu.key}>{menu.text}</li>
    })

    return (
      <div className={s.root}>
        <section className="sidebar">
          <ul className="menu-list">
          {menus}
          </ul>
        </section>
        <div className={s.container}>
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
        </div>
      </div>
    );
  }

}


export default withStyles(s)(Games);
