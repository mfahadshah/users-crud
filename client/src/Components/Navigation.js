import * as React from 'react';

import AuthService from './auth/AuthService';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const Auth = new AuthService();

export const mainListItems = (
  <>
    {Auth.getAdminType() === "admin" &&
    <ListItemButton  component={Link} to="/users">
      <ListItemIcon>
        <SupervisedUserCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    }
  </>
);