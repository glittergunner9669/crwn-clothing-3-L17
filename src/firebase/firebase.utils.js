import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA1Yux8qmwju63-VMX4WqHCrsOp8vRmxMg',
  authDomain: 'crwn-clothing-3-db.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-3-db.firebaseio.com',
  projectId: 'crwn-clothing-3-db',
  storageBucket: 'crwn-clothing-3-db.appspot.com',
  messagingSenderId: '834478342925',
  appId: '1:834478342925:web:5507080b2b5f003e002644'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
