/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tetris.css';
import {List, ListItem} from 'material-ui/List';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import EditorSpaceBar from 'material-ui/svg-icons/editor/space-bar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvStop from  'material-ui/svg-icons/av/stop';
class Tetris extends Component {

  render() {
    return (
      <div className="flexbox-container">
        <div>
          <div>
            <FlatButton
              label="New Game"
              icon={<AvPlayArrow />}
            />
            <FlatButton
              label="Pause"
              icon={<AvPause />}
            />
            <FlatButton
              label="Stop"
              icon={<AvStop />}
            />
          </div>
        </div>
        <div>
          <h1>Instructions</h1>
          <List>
            <ListItem primaryText="Move to the right" rightIcon={<NavigationArrowForward />} />
            <ListItem primaryText="Rotate left" rightIcon={<NavigationArrowDownward />} />
            <ListItem primaryText="Rotate right" rightIcon={<NavigationArrowUpward />} />
            <ListItem primaryText="Move to the left" rightIcon={<NavigationArrowBack />} />
            <ListItem primaryText="All the way to the bottom" rightIcon={<EditorSpaceBar />} />
          </List>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Tetris);
