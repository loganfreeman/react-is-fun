import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = (parseCallback) => (
  <Card>
    <CardHeader/>
    <CardMedia>
    <textarea name="textarea_code" rows="10" cols="50" defaultValue="Write something here"></textarea>
    </CardMedia>
    <CardText>

    </CardText>
    <CardActions>
      <FlatButton label="Parse" onClick={parseCallback}/>
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
