import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import TabsExampleSimple from './tab-example';

let tab = TabsExampleSimple();


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

const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      style={styles.gridList}
    >
      <GridTile
        key={1}
      >
      {tab}
      </GridTile>
      <GridTile
        key={2}
      >
      </GridTile>
    </GridList>
  </div>
);

export default GridListExampleSimple;
