import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {LeftTab, RightTab} from './tabs';
import _ from 'underscore';



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

function GridListGenerator(label, callback) {
  let left = LeftTab();

  let right = RightTab(label, callback);

  return (
    <div style={styles.root}>
      <GridList
        style={styles.gridList}
      >
        <GridTile
          key={1}
        >
        {left}
        </GridTile>
        <GridTile
          key={2}
        >
        {right}
        </GridTile>
      </GridList>
    </div>
  )
}

export default GridListGenerator;
