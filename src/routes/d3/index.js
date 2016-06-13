import React from 'react';
import Demo from './demo';
export default {

  path: '/d3',

  action() {

    let categories = {
      "Charts": ['Area Chart', 'Bar Chart', 'CandieStick Chart', 'Line Chart', 'Pie Chart', 'Scatter Chart', 'Treemap'],
      "Mxins": ['Cartesian Chart Mixins'],
      "Others": ['Axis', 'Date', 'Responsive Charts']
    }

    return <Demo title = "d3"
    categories = {
      categories
    }
    />;
  },

};
