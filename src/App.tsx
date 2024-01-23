import React, {useState} from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB2-zysIpXvKb_5g-fk1d7ygjeeNdT-Ohc",
    authDomain: "p2p-videocall.firebaseapp.com",
    databaseURL: "https://p2p-videocall-default-rtdb.firebaseio.com",
    projectId: "p2p-videocall",
    storageBucket: "p2p-videocall.appspot.com",
    messagingSenderId: "208076736873",
    appId: "1:208076736873:web:081ff558e2fd46bfb0d5f8"
  };

  const [permissionButton, setPermissionButton] = useState(false);
  const [createCallButton, setCreateCallButton] = useState(true);

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  const iceServers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302'
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const peerConnection = new RTCPeerConnection(iceServers);
  


  return (
    <div className="App">
      <header className="App-header">
        <div className='videoContainer'>
          <span>
            <h3>Local Stream</h3>
            <video id="localVideo" autoPlay playsInline></video>
          </span>
          <span>
            <h3>Remote Stream</h3>
            <video id="remoteVideo" autoPlay playsInline></video>
          </span>
        </div>

        <button id="permissionButton" onClick={getPermissions} disabled={permissionButton}>Get Permissions</button>
        <h2>2. Create a new Call</h2>
        <button id="createCallButton" onClick={createCall} disabled={createCallButton}>Create Call Link</button>


      </header>
    </div>
  );

  function getPermissions() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(mediaContent => {
        const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
        localVideo.srcObject = mediaContent;
        setCreateCallButton(false);
        setPermissionButton(true);
      })
      .catch(err => {
        // prompt user that permission was denied
        window.alert('Permission denied');
        console.log(err);
      });
  }

  function createCall() {
    window.alert('Create Call');
    console.log('Create Call');
    // create a new call 
  }
}




export default App;
