import React from 'react';
import Algorithms from './Algorithms';
export default {

  path: '/algorithms',

  action() {
    let algorithms = {
      sorting: [{
        label: 'insertion',
        text: 'Insertion Sort'
      }, {
        label: 'selection',
        text: 'Selection Sort'
      }, {
        label: 'bubble',
        text: 'Bubble Sort'
      }, {
        label: 'merge',
        text: 'Merge Sort'
      }, {
        label: 'quick',
        text: 'Quick Sort'
      }, {
        label: 'heap',
        text: 'Heap Sort'
      }],
      search: [{
        label: 'binary search',
        text: 'Binary Search'
      }],
      string: [{
        label: 'edit distance',
        text: 'Edit Distance'
      }, {
        label: 'suffix array',
        text: 'Suffix Array'
      }],
      greey: [{
        label: 'job scheduling',
        text: 'Job Scheduling'
      }],
      graph: [{
        label: 'bfs',
        text: 'Breadth First Search'
      }, {
        label: 'dfs',
        text: 'Depth First Search'
      }],
      canvas: [{
        label: 'manygolf',
        text: 'Many Golf'
      }]
    };

    return <Algorithms algorithms={algorithms} title="Algorithms"/>;
  },

};
