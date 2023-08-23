import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import {
  Navigate,
  Routes, 
  Route, 
  BrowserRouter
} from "react-router-dom";

import Home  from './home';
import Profile from './profile';
import Tasks  from './tasks';
import SignIn  from './sign-in';
import Scaffold  from './components/scaffold';
import CreateTask  from './tasks/create';
import { createTheme, ThemeProvider, TextField } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#024959', 
    },
    secondary: {
      main: '#026773', 
    },
    error: {
      main: '#FF3D00', 
    },
  },
});



export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<SignIn />} />
          <Route path="/" element={user ? <Scaffold user={user}/> : <Navigate to="login"/>}>
            <Route path="home" element={<Home user={user}/>} />
            <Route path="profile" element={<Profile user={user}/>} />
            <Route path="tasks/:id" element={<CreateTask user={user}/>} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
