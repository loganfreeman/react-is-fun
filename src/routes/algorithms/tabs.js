import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

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

const RightTab = (label) => (
  <Tabs>
    <Tab label={label} >
      <div>

      </div>
    </Tab>
  </Tabs>
);

export {LeftTab, RightTab};
