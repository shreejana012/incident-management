import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TeamLogo from './../assets/images/TeamLogo.png';

const useStyles = makeStyles(theme => ({
 card: {
 maxWidth: 600,
 margin: 'auto',
 marginTop: theme.spacing(5),
 },
 title: {
 padding: theme.spacing(3, 2.5, 2),
 color: theme.palette.openTitle,
 },
 media: {
 minHeight: 400,
 },
}));

export default function Home(){ 
    const classes = useStyles()
    const Style = { height: 500, width: 500};
    return (
        <Card className={classes.card}>

        <Typography variant="h6" className={classes.title}>Incident Management</Typography>
        <CardMedia className={classes.media} image={TeamLogo} title="Team Logo" style={Style}/>
        <CardContent>
            <Typography variant="body2" component="p"> 
                Welcome to The Avengers Incident Management.
            </Typography> 
        </CardContent>
        </Card> 
    )
}

