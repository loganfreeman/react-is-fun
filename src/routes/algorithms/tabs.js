import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import _ from 'underscore';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}

const LeftTab = () => (
  <Tabs>
    <Tab label="Tracer API" >
      <div>

      </div>
    </Tab>
    <Tab label="Description" >
      <div>

      </div>
    </Tab>
    <Tab label="Trace">
      <div>

      </div>
    </Tab>
  </Tabs>
);

function RightTab(label, callback) {
  let content = callback;
  if(_.isFunction(content)) {
    content = content(400, 400);
  }
  return (
    <Tabs>
      <Tab label={label} >
        <div>
          {content}
        </div>
      </Tab>
    </Tabs>
  )
}

export {LeftTab, RightTab};
