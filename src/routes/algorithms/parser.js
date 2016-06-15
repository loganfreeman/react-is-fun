import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = (parseCallback) => (
  <Card>
    <CardHeader/>
    <CardMedia>
    <textarea name="textarea" rows="10" cols="50" defaultValue="Write something here"></textarea>
    </CardMedia>
    <CardText>

    </CardText>
    <CardActions>
      <FlatButton label="Parse" onClick={parseCallback}/>
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
