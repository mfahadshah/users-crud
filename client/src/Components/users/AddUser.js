import React, { useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import Message from "./../common/Message";
import { useHistory } from "react-router-dom";
import AuthService from "../auth/AuthService";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    padding: "5px"
  },
  tbl: {
    marginTop: "20px"
  },
  addBtn: {
    float: "right",
    cursor: "pointer"
  },
  searchBtn: {
    marginLeft: "10px !important",
  },
  loader: {
    marginTop: "5px",
  }
}));

export default function AddUser(props) {
  const classes = useStyles();
  const history = useHistory();
  const [id, setId] = React.useState(
    Number(props.computedMatch.params.id) ? props.computedMatch.params.id : 0
  );
  
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState("");
  
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [keepPassword, setKeepPassword] = React.useState(true);

  const [phoneNo, setPhoneNo] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  const [role, setRole] = React.useState("");
  const [roleError, setRoleError] = React.useState("");

  const [loadMessage, setLoadMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const Auth = new AuthService();

  useEffect(() => {
    if(Auth.getAdminType() !== 0) 
    {
      window.location.hash = "/dashboard";
    }
  }, []);

  useEffect(() => {
    if(id > 0)
    {
      setLoading(true);
      Auth.fetch(`/users/${id}`)
        .then((res) => {
          if (res.success === true) {
            setFirstName(res.user.name);
            // setLastName(res.user.last_name);
            setEmail(res.user.email);
            setPhoneNo(res.user.phoneNo);
            setRole(res.user.role);
            setKeepPassword(false);
            setPassword("");
            setConfirmPassword("");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      setFirstNameError("Required");
      return;
    } else {
      setFirstNameError("");
    }

    // if (lastName === "") {
    //   setLastNameError("Required");
    //   return;
    // } else {
    //   setLastNameError("");
    // }
    if (email === "") {
      setEmailError("Required");
      return;
    } else {
      setEmailError("");
    }

    if (id === 0 || (id > 0 && keepPassword)) {
      if (password === "") {
        setPasswordError("Required");
        return;
      } else {
        setPasswordError("");
      }

      if (confirmPassword === "") {
        setConfirmPasswordError("Required");
        return;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
        return;
      } else {
        setConfirmPasswordError("");
      }
    }
    
    if (phoneNo === "") {
      setPhoneError("Required");
      return;
    } else {
      setPhoneError("");
    }

    if (role === "") {
      setRoleError("Required");
      return;
    } else {
      setRoleError("");
    }
console.log('hit 1')
    if (id > 0) {
      setLoading(true);
      Auth.fetch(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: firstName,
          // last_name: lastName,
          email: email,
          phoneNo: phoneNo,
          password: password,
          role:role, 
          update_password: keepPassword,
          // id: id,
        }),
      })
        .then((res) => {
          if (res.success === true) {
            setType("success");
            setLoadMessage(res.message);
            setTimeout(() => {
              history.push("/users");
            }, 1000);
            setLoading(false);
          } else {
            setType("error");
            setLoadMessage(res.message);
            
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      
      setLoading(true);
      Auth.fetch("/users", {
        method: "POST",
        body: JSON.stringify({
          name: firstName,
          email: email,
          phoneNo: phoneNo,
          password: password,
          role: role,
          // address
        }),
      })
        .then((res) => {
          if (res.success === true) {
            setType("success");
            setLoadMessage(res.message);
            setTimeout(() => {
              history.push("/users");
            }, 1000);
            
            setLoading(false);
          } else {
            setType("error");
            setLoadMessage(res.message);
            
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ width: "100%" }}>
    {loading && <LinearProgress className={classes.loader} />}
      <form className={classes.root} noValidate autoComplete="off">

      <TextField
          id="name"
          label="First Name"
          name="name"
          value={firstName}
          required
          autoFocus={true}
          onChange={(e)=>{
            setFirstName(e.target.value);
          }}
          error={firstNameError === "" ? false : true}
          helperText={firstNameError}
        />   
        <br/>
        <br/>
      {/* <TextField
          id="standard-basic"
          label="Last Name"
          name="last_name"
          value={lastName}
          required
          onChange={(e)=>{
            setLastName(e.target.value);
          }}
          error={lastNameError === "" ? false : true}
          helperText={lastNameError}
        />    */}
        <br/>
        <br/>
      <TextField
          id="email"
          label="Email"
          name="email"
          value={email}
          required
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          error={emailError === "" ? false : true}
          helperText={emailError}
        />   
        <br/>
        <br/>
        
        {id > 0 && (
          <FormControlLabel
            value="end"
            labelPlacement="end"
            control={
              <Checkbox
                checked={keepPassword === true || keepPassword > 0 ? true : false}
                onChange={(e)=>{
                  setKeepPassword(e.target.checked);
                }}
                inputProps={{
                  name: "keepPassword",
                  id: id,
                }}
                color="primary"
              />
            }
            label="Update Password"
          />
        )}
        <br/>
        <TextField
          id="password"
          type="password"
          label="Password"
          name="password"
          value={password}
          required
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          disabled={!keepPassword}
          error={passwordError === "" ? false : true}
          helperText={passwordError}
        />   
        <br/>
        <br/>
        
        <TextField
          id="passwordc"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={(e)=>{
            setConfirmPassword(e.target.value);
          }}
          disabled={!keepPassword}
          error={confirmPasswordError === "" ? false : true}
          helperText={confirmPasswordError}
        />   
        <br/> 
        <br/>
        <TextField
          id="phoneNo"
          label="Phone"
          name="phone"
          value={phoneNo}
          required
          onChange={(e)=>{
            setPhoneNo(e.target.value);
          }}
          error={phoneError === "" ? false : true}
          helperText={phoneError}
        />   
        <br/>
        <br/>
        <FormControl sx={{ minWidth: 220 }} error={roleError === "" ? false : true}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={(e)=> {
              setRole(e.target.value);
            }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"basic"}>Basic</MenuItem>
          </Select>
        </FormControl>
        
        <FormHelperText>{roleError}</FormHelperText>
        <br/>
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "0 10px", float: "right" }}
            className={classes.button}
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{ float: "right" }}
            onClick={() => {
              history.push("/users");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
      <Message type={type} msg={loadMessage} />
    </div>
  );
}
