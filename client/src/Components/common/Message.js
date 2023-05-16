import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import makeStyles from '@mui/styles/makeStyles';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      // marginTop: theme.spacing(2),
    },
  },
}));

export default function Message(props) {
  const classes = useStyles();

  const [vertical] = React.useState("bottom");
  const [horizontal] = React.useState("center");

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.msg === "" ? false : true);
  }, [props.msg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function setSliderFunc(event) {
    // Here, we invoke the callback with the new value
    props.setSliderFunc(5);
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert
          onClose={handleClose}
          severity={props.type ? props.type : "success"}
        >
          {props.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}