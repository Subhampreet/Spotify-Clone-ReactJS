import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Components/Login';
import { getTokenFromResponse } from "./Components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";

const s = new SpotifyWebApi();

function App() {

  const [ token , setToken] = useState(null);


  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if(_token){
      setToken(_token);

      s.setAccessToken(_token);

      s.getMe().then((user) => {
        console.log("⚡", user);
      });
    }
    
  }, []);

  return (
    <div className="App">
      {
        token ? (<Player />): (<Login />)
      }
    </div>
  );
}

export default App;
