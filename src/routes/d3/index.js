import React from 'react';
import Demo from './demo';
export default {

  path: '/d3',

  action() {

    let  categories = {
        "Inbox": ['Starred', 'Sent mail', 'Drafts', 'Inbox'],
        "All mail": ['Trash', 'Spam', 'Follow up']
      }

    return <Demo title="d3" categories={categories}/>;
  },

};
