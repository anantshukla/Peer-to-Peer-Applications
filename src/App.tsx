import React from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { error } from 'console';

function App() {

  const app = initializeApp(firebaseConfig);


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

        <button onClick={getPermissions}>Get Permissions</button>
        <h2>2. Create a new Call</h2>
        <button onClick={createCall} disabled>Create Call Link</button>


      </header>
    </div>
  );
}

function getPermissions() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(mediaContent => {
      const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
      localVideo.srcObject = mediaContent;
      const callButton: HTMLButtonElement = document.getElementById('callButton') as HTMLButtonElement;
      callButton.disabled = false;
    })
    .catch(error => {
      // prompt user that permission was denied
      window.alert('Permission denied');
    });
}

function createCall() {
  // create a new call

}


export default App;
