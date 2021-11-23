import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
}));

export default function Home() {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.assign("/final");
    }
  }, []);

  return (
    <Card className={classes.card}>
      <Typography variant="h4" className={classes.title}>
        Home Page
      </Typography>
      <CardContent>
        <Typography variant="body1" component="p">
          Welcome to Membership home page
        </Typography>
      </CardContent>
      <CardContent>
        <Link to="/register">
          <Button color="primary" variant="contained">
            Register
          </Button>
        </Link>
      </CardContent>
      <CardContent>
        <Link to="/signin">
          <Button color="primary" variant="contained">
            Sign In
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
