import React, { useState, useEffect, useRef } from "react";
import { CardActions, makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import homeImage from "../assets/images/homeImage.jpg";
import { Button } from "@material-ui/core";
import auth from "../auth/auth-helpers";
import IdleTimer from "react-idle-timer";

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
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

export default function Final() {
  const classes = useStyles();
  const [values, setValues] = useState({
    userName: "",
    email: "",
  });

  const [timeout, setTimeout] = useState(600000);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    setValues({ userName: token.user.userName, email: token.user.email });
  }, []);

  const action = (e) => {
    console.log("User did something", e);
    setIsTimedOut(false);
  };

  const active = (e) => {
    console.log("User is active", e);
    setIsTimedOut(false);
  };

  const idle = (e) => {
    console.log("user is idle", e);

    setTimeout(() => {
      auth.clearToken(() => window.location.assign("/"));
    }, timeout);
  };

  return (
    <div>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onActive={active}
        onAction={action}
        onIdle={idle}
        debounce={250}
        timeout={timeout}
      />
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          Final Page
        </Typography>
        <CardMedia
          className={classes.media}
          image={homeImage}
          title="Congratulations"
        />
        <CardContent>
          <Typography variant="body1" component="p">
            Welcome to Final Page <b>{values.userName}</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="inherit"
            onClick={() => {
              auth.clearToken(() => window.location.assign("/"));
            }}
          >
            Sign out
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
