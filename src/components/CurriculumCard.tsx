import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

function CurriculumCard(props: any) {
  const { curriculumId, name, duration, slug, url } = props;
  const handleclick = () => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Moved to Task page',
    });
  };

  return (
    <Card className="card">
      <Grid container direction="row" justify="space-between">
        <Grid item md={4}>
          <CardMedia component={'img'} image={url} title={name} />
        </Grid>
        <Grid item md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {slug}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <CardContent>
            <Typography gutterBottom component="h6">
              Estimated Duration : {duration}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item md={6}>
          <CardActions>
            <Button variant="contained" color="primary">
              <Link
                to={`/curriculum/${curriculumId}`}
                style={{ color: '#fff', textDecoration: 'none' }}
                onClick={handleclick}
              >
                Tasks
              </Link>
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CurriculumCard;
