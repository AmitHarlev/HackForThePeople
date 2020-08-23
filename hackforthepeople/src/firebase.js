import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyCeHaINilUoapZQrDfQP4SI-guU1QrFcdY",
    authDomain: "hack-for-the-people.firebaseapp.com",
    databaseURL: "https://hack-for-the-people.firebaseio.com",
    projectId: "hack-for-the-people",
    storageBucket: "hack-for-the-people.appspot.com",
    messagingSenderId: "591486962519",
    appId: "1:591486962519:web:d0dc7ba2cbb582388c8c12"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

// TODO: do we need this?
// db.settings({
//   timestampsInSnapshots: true
// });

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const signOut = () => {
  // TODO: catch promise
  auth.signOut();
}

export const setUserOpinions = (opinions) => {
  const user = getCurrentUser();
  let opinions_and_completed_survey_bool = {
    completedSurvey: true,
    ...opinions
  }
  db.collection('users').doc(user.uid).update(opinions_and_completed_survey_bool)
}

export const sendConversationRequest = ({id, data, topic}) => {
  const user = getCurrentUser();
  const usersRef = db.collection("users");
  usersRef.doc(user.uid).get().then(doc => {
    const user_topic_value = doc.data()[topic];
    usersRef.doc(id).update({
      requests: firebase.firestore.FieldValue.arrayUnion({"user":user.uid, "topic":topic, "value": user_topic_value, state:0}),
    });
    usersRef.doc(user.uid).update({
      requestsSent: firebase.firestore.FieldValue.arrayUnion({"user":id, "topic":topic, "value":data[topic], state:0}),
    });
  }) 
}

export const cancelOutBoundRequest = (request) => {
  const user = getCurrentUser();
  const usersRef = db.collection("users");
  usersRef.doc(user.uid).update({
    requestsSent: firebase.firestore.FieldValue.arrayRemove(request)
  });
  const otherUserID = request.user;
  usersRef.doc(otherUserID).get().then(doc => {
    for (const req of doc.data().requests) {
      if (req.user === user.uid && req.topic === request.topic) {
        usersRef.doc(otherUserID).update({
          requests: firebase.firestore.FieldValue.arrayRemove(req)
        });
      }
    }
  })
}

export const ignoreInboundRequest = (request) => {
  const user = getCurrentUser();
  const usersRef = db.collection("users");
  usersRef.doc(user.uid).update({
    requests: firebase.firestore.FieldValue.arrayRemove(request)
  });
  const otherUserID = request.user;
  usersRef.doc(otherUserID).get().then(doc => {
    for (const req of doc.data().requestsSent) {
      if (req.user === user.uid && req.topic === request.topic) {
        usersRef.doc(otherUserID).update({
          requestsSent: firebase.firestore.FieldValue.arrayRemove(req)
        });
      }
    }
  })
}

export const acceptIncomingRequest = (request) => {
  const user = getCurrentUser();
  const usersRef = db.collection("users");
  db.collection("meetings").add({
    messages:[],
    ratings:[]
  }).then(docRef => {
    const newMeetingID = docRef.id;
    usersRef.doc(user.uid).update({
      currentMeeting: newMeetingID
    });
    const otherUserID = request.user;
    usersRef.doc(otherUserID).update({
      currentMeeting: newMeetingID
    });
    usersRef.doc(user.uid).update({
      requests: firebase.firestore.FieldValue.arrayRemove(request)
    });
    let newRequest = request;
    newRequest.state = 1;
    usersRef.doc(user.uid).update({
      requests: firebase.firestore.FieldValue.arrayUnion(newRequest)
    });
    usersRef.doc(otherUserID).get().then(doc => {
      for (const req of doc.data().requestsSent) {
        if (req.user === user.uid && req.topic === request.topic) {
          usersRef.doc(otherUserID).update({
            requestsSent: firebase.firestore.FieldValue.arrayRemove(req)
          });
          let newReq = req;
          newReq.state = 1;
          usersRef.doc(otherUserID).update({
            requestsSent: firebase.firestore.FieldValue.arrayUnion(newReq)
          });
        }
      }
    })
  })
  
}

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(function(result) {

    const user = result.user;
    const usersRef = db.collection('users');

    usersRef.doc(user.uid).get()
      .then(
        (doc) => {
          if (!doc.exists) {
            usersRef.doc(user.uid).set({
              name: user.displayName,
              completedSurvey: false,
              requests:[],
              requestsSent:[],
              currentMeeting: '',
              ratings: [{
                uid: "Ilona Kariko",
                rating: 1
              }, {
                uid: "Ingrid Tsang",
                rating: 4
              }]
            });
          }
        }
      )
      .catch(
        (err) => {
          console.log("error: " + err);
        }
      )

  }).catch(function(error) {
    console.log(error.message)
  });
};

export const addChatMessage = (meetingId, timestamp, chatMessage) => {
  const user = getCurrentUser();
  const message =
    {
        "message": chatMessage,
        "timestamp": timestamp, // or firebase.firestore.FieldValue.serverTimestamp()
        "uid": user.uid
    };
  db.collection('meetings').doc(meetingId).update({
    messages: firebase.firestore.FieldValue.arrayUnion(message)
  });
}

export const addChatRating = (otherUserId, meetingId, chatRating) => {
  const user = getCurrentUser();
  const rating =
    {
        "rating": chatRating,
        "uid": user.uid
    };
  // TODO: not working?
  db.collection('meetings').doc(meetingId).update({
    ratings: firebase.firestore.FieldValue.arrayUnion(rating)
  });
  // TODO: remove previous entry if exists
  db.collection('users').doc(otherUserId).update({
    ratings: firebase.firestore.FieldValue.arrayUnion(rating)
  })
}

export const endCurrentMeeting = (meetingId) => {
  const user = getCurrentUser();

  db.collection('users').doc(user.uid).update({
    currentMeeting: ''
  });

}