import React, {useState} from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, collection, doc } from "firebase/firestore";

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

  const [permissionButtonDisabled, setPermissionButtonDisabled] = useState(false);
  const [createCallButtonDisabled, setCreateCallButtonDisabled] = useState(true);
  const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true);
  const [answerCallButtonDisabled, setAnswerCallButtonDisabled] = useState(true);  

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

  let localVideoStream: MediaStream;
  let remoteVideoStream: MediaStream;

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

        <button id="permissionButton" onClick={getPermissions} disabled={permissionButtonDisabled}>Get Permissions</button>
        <h2>2. Create a new Call</h2>
        <button id="createCallButton" onClick={createCall} disabled={createCallButtonDisabled}>Create Call Link</button>

        <h2>3. Join a Call</h2>    
        <input id="callInputID" disabled={answerCallButtonDisabled} />
        <button id="answerCallButton" disabled={answerCallButtonDisabled} >Answer</button>

        <h2>4. Hangup</h2>

        <button id="hangupCallButton" disabled={hangupButtonDisabled} >Hangup</button>
      </header>
    </div>
  );

  function getPermissions() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(mediaContent => {
        localVideoStream = mediaContent;
        remoteVideoStream = new MediaStream();

        localVideoStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, localVideoStream);
        });

        peerConnection.ontrack = event => {
          event.streams[0].getTracks().forEach(track => {
            remoteVideoStream.addTrack(track);
          });
        }

        // display local video stream on the page
        const localVideo = document.getElementById('localVideo') as HTMLMediaElement;
        localVideo.srcObject = localVideoStream;

        setCreateCallButtonDisabled(false);
        setAnswerCallButtonDisabled(false);
        setPermissionButtonDisabled(true);
      }).catch(err => {
        // prompt user that permission was denied
        window.alert('Permission denied');
        console.log(err);
      });
  }

  async function createCall() {
    // console.log(firestore)
    const rootCollection = collection(firestore, 'calls');
    const offerCandidates = doc(rootCollection, 'offerCandidates');
    const answerCandidates = doc(rootCollection, 'answerCandidates');
    console.log(rootCollection)
    console.log(offerCandidates);
    console.log(answerCandidates);
    // const callStorageDoc = firestore.collection('calls').doc();
    // const offerCandidates = callStorageDoc.collection('offerCandidates');
    // const answerCandidates = callStorageDoc.collection('answerCandidates');

    const callInputID = document.getElementById('callInputID') as HTMLInputElement;
    // callInputID.value = callStorageDoc.id;

    // window.alert('Create Call');

    console.log('Create Call');
    
    // create a new call
    setAnswerCallButtonDisabled(false);
    setHangupButtonDisabled(false);
  }
}


export default App;
