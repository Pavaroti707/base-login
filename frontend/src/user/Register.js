import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { Link } from "react-router-dom";
import { create, list } from "./api-user";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    open: false,
    error: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  useEffect(() => {
    console.log(values.error);
  }, [values]);

  const changeHandler = (userName) => (event) => {
    setValues({ ...values, [userName]: event.target.value });
  };

  const clickHandler = () => {
    const user = {
      userName: values.userName || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    if (user.userName === "" || user.userName === undefined) {
      return setValues({ ...values, error: "User name is required!" });
    }

    if (user.email === "" || user.email === undefined) {
      return setValues({ ...values, error: "Email is required!" });
    }

    if (user.password === "" || user.password === undefined) {
      return setValues({ ...values, error: "Password is required!" });
    }

    let tempPassword = user.password.split("");

    for (let i = 0; i < tempPassword.length; i++) {
      let temp = tempPassword[i].charCodeAt();

      if (temp < 97 || temp > 122) {
        return setValues({
          ...values,
          error: "Password can only contain lower case letters",
        });
      }
    }

    if (tempPassword.length < 6) {
      return setValues({
        ...values,
        error: "Password must be longer then 6 letters",
      });
    }

    if (user.password !== values.repeatPassword) {
      return setValues({
        ...values,
        error: "Passwords don't match",
      });
    }

    for (let i = 0; i < users.length; i++) {
      if (user.userName === users[i].userName) {
        return setValues({
          ...values,
          error: "User with that username already exists",
        });
      }
    }

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Register
          </Typography>
          <TextField
            id="userName"
            label="User Name"
            className={classes.textField}
            value={values.userName}
            onChange={changeHandler("userName")}
            margin="normal"
          />
          <br />

          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={changeHandler("email")}
            margin="normal"
          />
          <br />

          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={changeHandler("password")}
            margin="normal"
          />
          <br />

          <TextField
            id="repeatPassword"
            type="password"
            label="Repeat Password"
            className={classes.textField}
            value={values.repeatPassword}
            onChange={changeHandler("repeatPassword")}
            margin="normal"
          />
          <br />

          {values.error && (
            <div>
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error{" "}
                </Icon>
              </Typography>
              <Typography component="p" color="error">
                {values.error}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickHandler}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>

        <Dialog open={values.open}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus">
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
