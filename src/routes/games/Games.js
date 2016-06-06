import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Games.css';

const title = 'Games';

function Games(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Games.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Games);
